-- CreateTriggerFunction
CREATE OR REPLACE FUNCTION update_event_ticket_counts()
RETURNS TRIGGER AS $$
BEGIN
    -- Если билет добавляется
    IF TG_OP = 'INSERT' THEN
        -- Увеличиваем количество проданных билетов
        UPDATE "Event"
        SET tickets_sold = tickets_sold + 1,
            tickets_available = tickets_available - 1
        WHERE event_id = NEW.event_id;

    -- Если статус билета обновляется
    ELSIF TG_OP = 'UPDATE' THEN
        -- Проверяем, изменился ли статус билета
        IF NEW.status = 'verified' AND OLD.status != 'verified' THEN
            -- Увеличиваем количество проданных билетов
            UPDATE "Event"
            SET tickets_sold = tickets_sold + 1,
                tickets_available = tickets_available - 1
            WHERE event_id = NEW.event_id;
        ELSIF NEW.status != 'verified' AND OLD.status = 'verified' THEN
            -- Уменьшаем количество проданных билетов
            UPDATE "Event"
            SET tickets_sold = tickets_sold - 1,
                tickets_available = tickets_available + 1
            WHERE event_id = NEW.event_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CreateTrigger
DROP TRIGGER IF EXISTS ticket_count_trigger ON "Ticket";
CREATE TRIGGER ticket_count_trigger
AFTER INSERT OR UPDATE ON "Ticket"
FOR EACH ROW EXECUTE FUNCTION update_event_ticket_counts();

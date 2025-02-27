CREATE OR REPLACE FUNCTION update_event_ticket_counts()
RETURNS TRIGGER AS $$
BEGIN
    -- Если билет добавляется
    IF TG_OP = 'INSERT' THEN
        -- Увеличиваем количество проданных билетов если билет продан
        IF NEW.status = 'sold' THEN
            UPDATE "Event"
            SET tickets_sold = tickets_sold + 1,
                tickets_available = tickets_available - 1
            WHERE id = NEW.id;
        END IF;

    -- Если статус билета обновляется
    ELSIF TG_OP = 'UPDATE' THEN
        -- Проверяем, изменился ли статус билета на sold
        IF NEW.status = 'sold' AND OLD.status != 'sold' THEN
            -- Увеличиваем количество проданных билетов
            UPDATE "Event"
            SET tickets_sold = tickets_sold + 1,
                tickets_available = tickets_available - 1
            WHERE id = NEW.id;
        ELSIF NEW.status != 'sold' AND OLD.status = 'sold' THEN
            -- Уменьшаем количество проданных билетов
            UPDATE "Event"
            SET tickets_sold = tickets_sold - 1,
                tickets_available = tickets_available + 1
            WHERE id = NEW.id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

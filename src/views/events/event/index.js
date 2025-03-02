import React from 'react';
import Link from "next/link";

import * as userService from "@entities/user/services";
import { FullInfo } from "@entities/event";
import { Button } from "@/shared/ui";

import * as S from './styles';
import { ROUTES } from '@/core/routes';

const SellerInfo = async ({ id }) => {
  const data = await userService.getUserById(id);

  return (
    <span>
      Seller: {data.name}
    </span>
  )
}

const EventPage = (props) => {
  const { event, tickets } = props;

  return (
    <div>
      <FullInfo event={event} />
      <div>
        Tickets
      </div>
      <ul>
        {tickets?.map(ticket => {
          const {
            id,
            user_id,
            price,
            price_currency = 'usd'
          } = ticket;

          const href = `${ROUTES.payment.href}?amount=${price}&currency=${price_currency}`;

          return (
            <S.TicketRow key={id}>
              <SellerInfo id={user_id} />
              {/* фото билета не отображается до покупки */}
              {/* <img src={t.photoUrl} alt={`Ticket ${t.id}`} /> */}
              <S.Caption>
                {price} {price_currency}
              </S.Caption>
              <Button
                variant='primary'
                size='medium'
              >
                <Link href={href} >
                  Buy
                </Link>
              </Button>
            </S.TicketRow>
          )
        })}
      </ul>
    </div>
  );
};

export default EventPage;

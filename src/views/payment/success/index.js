import Link from "next/link";

import { ROUTES } from "@/core/routes";
import { Button } from "@/shared/ui";

import * as S from './styles';

async function Page() {
  return (
    <S.Wrapper id="success">
      <S.Title>
        We appreciate your business! If you have any questions, please email
        {' '}
        <S.Link href="mailto:orders@example.com">orders@example.com</S.Link>.
      </S.Title>
      <Button
        variant='primary'
        size='medium'
        isFullWidth
      >
        <Link href={ROUTES.home.href}>Back to home</Link>
      </Button>
      <Button
        variant='primary'
        size='medium'
        isFullWidth
      >
        <Link href={ROUTES.tickets.ownList.href}>My tickets</Link>
      </Button>
    </S.Wrapper>
  )
}

export default Page;

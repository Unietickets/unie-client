import Link from 'next/link';
import React from 'react';

const page = async (props) => {
  const { params } = props;

  const slug = (await params).slug;

  return (
    <div>
      buy ticket {slug}
      <Link
        href={`/payment?amount=100`}
        state={{ ticketId: slug }}
      >
        Buy
      </Link>
    </div>
  );
};

export default page;

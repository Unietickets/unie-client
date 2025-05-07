'use client';

import React, { useState } from 'react';

import { Switch, TagGroup } from "@/shared/ui";
import { UserInfo } from "@/entities/user";
import { addIconToTransaction, TransactionCardsList } from '@/entities/transaction';
import { LogoutButton } from "@features/auth";

import { MyTickets } from './tabs';
import * as S from './styles';
import { Tab, Tabs } from './constants';

const ProfilePage = ({ user, transactions, tickets }) => {
  const [activeTab, setActiveTab] = useState(Tab.transactions);

  const transactionsWithIcons = transactions.map(addIconToTransaction);

  return (
    <S.Wrapper>
      <h1 className="text-2xl font-bold">Profile</h1>
        <UserInfo user={user} />
        <LogoutButton />
        <TagGroup>
          {Tabs.map((tag) => (
            <TagGroup.Tag
              key={tag}
              isActive={tag === activeTab}
              onClick={() => setActiveTab(tag)}
            >
              {tag}
            </TagGroup.Tag>
          ))}
        </TagGroup>
        {activeTab === Tab.myTickets && (
          <MyTickets tickets={tickets} />
        )}
        {activeTab === Tab.deals && (
          <div>
            deals
          </div>
        )}
        {activeTab === Tab.transactions && (
          <div>
            <TransactionCardsList transactions={transactionsWithIcons} />
          </div>
        )}
    </S.Wrapper>
  )
};

export default ProfilePage;

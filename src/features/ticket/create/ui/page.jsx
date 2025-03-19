'use client';

import { useRef, useState } from 'react';

import { PhotoUploader, uploadToServer } from '@/entities/file';
import { Button, Input, Select } from '@/shared/ui';

import { createTicket } from './helpers';
import * as S from './styles';

const page = ({ user, availableEvents }) => {
  const [previewFiles, setPreviewFiles] = useState([]);
  const fileInputRef = useRef(null);

  const [selectedEvent, setSelectedEvent] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const filesObjectToUpload = Object.values(fileInputRef.current.files);
    const photosResult = await uploadToServer(filesObjectToUpload);

    const data = {
      event: selectedEvent,
      description,
      price,
      files: photosResult,
      user,
    };

    if (photosResult !== null) {
      await createTicket(data);
      alert('Ticket created!');
      redirect(ROUTES.tickets.ownList.href);
    }
  }

  return (
    <S.Wrapper onSubmit={handleSubmit}>
      <label htmlFor='event'>Event</label>
      <Select
        name="event"
        options={availableEvents}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.name}
        value={selectedEvent}
        onChange={(value) => setSelectedEvent(value)}
      />

      <label htmlFor='description'>Description</label>
      <Input
        id="description"
        name='description'
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor='price'>Price</label>
      <Input
        id="price"
        name='price'
        type="text"
        placeholder="Enter price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <PhotoUploader
        files={previewFiles}
        setFiles={setPreviewFiles}
        fileInputRef={fileInputRef}
        name="photo"
      />

      <Button
        isRounded
        size='medium'
        variant='primary'
        type='submit'
      >
        Create Ticket
      </Button>
    </S.Wrapper>
  );
};

export default page;

'use client';

import { useRef, useState } from 'react';

import { PhotoUploader, uploadToServer } from '@/entities/file';
import { Button, Input, Select, Option, SingleValue } from '@/shared/ui';

import { createTicket } from './helpers';
import * as S from './styles';

const mapEventsToSelectOptions = (events) => events.map((event) => ({
  value: event.id,
  label: event.name,
  date: event.event_date,
  image: event.image,
}));

export const CreateTicketForm = ({ user, availableEvents }) => {
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

  const isEventChosen = selectedEvent?.value;
  const isEventInProgress = !selectedEvent?.value && !description && !price;

  const isDescriptionChosen = description.length > 0;
  const isDescriptionInProgress = isEventChosen && !description && !price;

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Wrapper>
        <S.Row>
          <S.FirstLine
            isDone={isEventChosen}
            isInProgress={isEventInProgress}
          />
          <S.FormTitle>
            Make your deal with Unie
          </S.FormTitle>
        </S.Row>

        <S.Row>
          <S.Circle
            isDone={isEventChosen}
            isInProgress={isEventInProgress}
          >
            {isEventChosen ? 'Ok' : '1'}
          </S.Circle>

          <S.FieldWithPositionedLabel>
            <S.Label htmlFor='event'>Event</S.Label>
            <Select
              name="event"
              options={mapEventsToSelectOptions(availableEvents)}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              value={selectedEvent}
              onChange={(value) => setSelectedEvent(value)}
              components={{ Option, SingleValue }}
            />
          </S.FieldWithPositionedLabel>
        </S.Row>

        <S.SecondLine
          isDone={isDescriptionChosen}
          isInProgress={isDescriptionInProgress}
        />

        <S.Row>
          <S.Circle
            isDone={isDescriptionChosen}
            isInProgress={isDescriptionInProgress}
          >
            {isEventChosen ? 'Ok' : '2'}
          </S.Circle>

          <S.FieldWithPositionedLabel>
            <S.Label htmlFor='description'>Description</S.Label>
            <Input
              id="description"
              name='description'
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </S.FieldWithPositionedLabel>
        </S.Row>

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
    </S.Form>
  );
};

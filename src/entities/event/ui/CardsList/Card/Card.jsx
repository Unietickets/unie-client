import Link from "next/link";

import * as Styles from "./Card.styles";

export const Card = ({ image, title, venue, metadata, link, className, ...props }) => (
  <Styles.StyledEventCard className={className} {...props}>
    <Link href={link}>
      {metadata && (
        <Styles.MetadataWrapper>
          {metadata?.map((item) => (
            <Styles.MetadataItem key={item.name} accent={item.accent}>
              <Styles.MetadataItemText>{item.value}</Styles.MetadataItemText>
            </Styles.MetadataItem>
          ))}
          <Styles.MetadataItem>
            <Styles.MetadataItemText>
              <strong>→</strong>
            </Styles.MetadataItemText>
          </Styles.MetadataItem>
        </Styles.MetadataWrapper>
      )}
      <Styles.ImageWrapper>
        <Styles.EventImage src={image} alt={title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <Styles.ContentWrapper>
          <Styles.Title>{title}</Styles.Title>
          <Styles.Venue>{venue}</Styles.Venue>
        </Styles.ContentWrapper>
      </Styles.ImageWrapper>
    </Link>
  </Styles.StyledEventCard>
);

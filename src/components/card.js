function Card(props) {
  let { cardClasses, cardTitle } = props;
  cardClasses = `card ${cardClasses}`;

  return (
    <div className={cardClasses}>
      {cardTitle && (
        <div className="card-header">
          <h5 className="mb-0">{cardTitle}</h5>
        </div>
      )}
      <div className="card-body">{props.children}</div>
    </div>
  );
}

export default Card;

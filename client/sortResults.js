const sortResults = (data) => {
  return data.sort((a, b)=> (b.distance/ b.moving_time) - (a.distance / a.moving_time));
}
var addEventListeners = () => {
$('#authorizeRequest').on('submit', (event) => {
  event.preventDefault();
  $.ajax({
    method: 'GET',
    url: `https://aqueous-fjord-59533.herokuapp.com/authorize`,
    contentType: 'application/json',
    success: (data) => {
      console.log(data)
    },
    error: (err) => {
      console.log(err);
    }
  })
})

  $('#postRequest').on('submit', (event) => {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'http://localhost:4000',
      contentType: 'application/json',
      // data: JSON.stringify({ userId: 61039 }),
      success: (data) => {
        $('body').html(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  })

  $('#getRequest').on('submit', (event) => {
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: 'http://127.0.0.1:4000/getResults',
      contentType: 'application/json',

      success: (data) => {
        const sortedResults = sortResults(data);
        const formatedResults = formatResults(sortedResults);

        $('body').html(formatedResults);

      },
      error: (err) => {
        console.log(err);
      }
    })
  })



}
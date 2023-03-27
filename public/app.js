async function fetchData() {
    await fetch('http://localhost:3000/check-session')
      .then(response => response.json())
      .then((data) => {
        responseData = data.remainingTime;
      });
  }
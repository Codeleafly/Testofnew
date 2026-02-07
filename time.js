function getDateTime() {
  const now = new Date();

  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });

  console.log("Date:", date);
  console.log("Time:", time);
  console.log("Day:", day);
}

// function call
getDateTime();

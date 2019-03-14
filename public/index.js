const getHedgehogs = () => {
  $('#hedgehog-info').html('');
  $('form')[0].reset();

// Sets up the fetch request to the invites endpoint of the hedgehog API, aka, the best API.
  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`)
  // When the fetch Promise resolves, take the response and convert it into JSON
    .then(response => response.json())
    // When the response.json() Promise resolves, take THAT response as hedgehogs and call appendHedgehogs, passing it the hedgehogs JSON.
    .then(hedgehogs => appendHedgehogs(hedgehogs))
    // If either of the the Promises rejects, catch the error and log it. 
    .catch(error => console.error({ error }));
};

// Loops through the hedgehogs array and calls appendHedgehog for each individual hedgie
const appendHedgehogs = (hedgehogs) => {
  hedgehogs.forEach(hedgehog => {
    appendHedgehog(hedgehog);
  });
};

// Actually updates the document with a new line item for the hedgehog object. 
const appendHedgehog = (hedgehog) => {
  $('#invited-hedgehogs-info').append(`
    <article class="invited-hedgehog">
      <p class="name">${hedgehog.name}</p>
      <p class="hoglet-number">${hedgehog.hoglets}</p>
      <p class="allergies">${hedgehog.allergies}</p>
      <button
        id="${hedgehog.id}"
        class="uninvite-btn"
        aria-label="Uninvite">
        uninvite
      </button>
    </article>
  `);
};

const addNewHedgehog = (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const hoglets = document.getElementById('hoglets').value;
  const allergies = document.getElementById('allergies').value;
  fetch('https://hedgehog-party.herokuapp.com/api/v1/invites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      hoglets: hoglets,
      allergies: allergies
    }),
  })
    .then(response => response.json())
    .then(idInfo => getHedgehogs())
    .catch(error => console.error({ error }));
};

const unInviteHedgehog = () => {
  console.log("we are in the unInviteHedgehog function");
};

getHedgehogs();

$('#invite-btn').on('click', addNewHedgehog);

$('#invited-hedgehogs-info').on('click', '.uninvite-btn', unInviteHedgehog);

//URL: https://hedgehog-party.herokuapp.com/api/v1/invites

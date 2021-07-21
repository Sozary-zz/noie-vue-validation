function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateZipAndCity(zip, city) {
  if (isNaN(zip) || isNaN(parseInt(zip))) {
    return false;
  }
  zip = parseInt(zip);

  switch (city) {
    case "Copenhagen":
      return zip >= 1000 && zip <= 1499;
    case "Aarhus":
      return [8000, 8200, 8210].includes(zip);
    case "Odense":
      return [
        5000, 5100, 5200, 5210, 5220, 5230, 5240, 5250, 5260, 5270,
      ].includes(zip);
    case "Aalborg":
      return [9000, 9200, 9210, 9220].includes(zip);
    default:
      return false;
  }
}

exports.handler = async (event) => {
  const response = {
    statusCode: null,
    messages: [],
  };

  for (const elem of ["email", "city", "zip"]) {
    if (!(elem in event)) {
      response.statusCode = 403;
      response.messages.push(`Field ${elem} not provided`);
    }
  }

  if (response.statusCode === 403) {
    return response;
  }

  if (!validateEmail(event.email)) {
    response.statusCode = 403;
    response.messages.push(`Wrong email format`);
  }

  if (!validateZipAndCity(event.zip, event.city)) {
    response.statusCode = 403;
    response.messages.push(`Unknown city or zip code mismatch`);
  }

  if (response.statusCode === 403) {
    return response;
  }

  response.statusCode = 200;

  return response;
};

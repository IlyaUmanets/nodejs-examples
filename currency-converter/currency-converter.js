const axios = require('axios');

const getExchangeRate = async(fromCurrency, toCurrency) => {
  try {
    const response = await axios.get(`http://api.currencylayer.com/live?access_key=ee826cdaf839fea3ee43247505479a5a&format=1&`);

    const exchangeRate = response.data.quotes[`${fromCurrency}${toCurrency}`]

    return exchangeRate;
  } catch (error) {
    throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
  }
}

const getCountries = async(currencyCode) => {
  try {
    const response = await axios.get(`http://restcountries.eu/rest/v2/currency/${currencyCode}`);

    return response.data.map(country => country.name);
  } catch (error) {
    throw new Error(`Unable to get countries that use ${currencyCode}`)
  }
}

const convertCurrency = async(fromCurrency, toCurrency, amount) => {
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  const countries = await getCountries(toCurrency);
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}.
          You can spend these in the following countries: ${countries}`;
};

exports.convertCurrency = convertCurrency

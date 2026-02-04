// Carbon emission formulas (CO2 in kg)
const carbonFormulas = {
  transportation: {
    car_petrol: (km) => km * 0.12,
    car_diesel: (km) => km * 0.10,
    car_electric: (km) => km * 0.05,
    bus: (km) => km * 0.05,
    train: (km) => km * 0.03,
    flight_short_haul: (km) => km * 0.255,
    flight_long_haul: (km) => km * 0.190,
  },
  energy: {
    electricity: (kwh) => kwh * 0.5,
    natural_gas: (therms) => therms * 5.3,
    heating_oil: (gallons) => gallons * 10.2,
  },
  diet: {
    beef_meal: () => 6.0,
    pork_meal: () => 2.5,
    chicken_meal: () => 1.8,
    fish_meal: () => 1.5,
    vegetarian_meal: () => 1.5,
    vegan_meal: () => 0.5,
  },
  consumption: {
    shopping: (amount) => amount * 0.02,
    waste: (kg) => kg * 0.5,
    water: (liters) => liters * 0.0003,
  },
};

const calculateEmission = (type, subType, value) => {
  const formula = carbonFormulas[type]?.[subType];
  if (!formula) {
    throw new Error('Invalid activity type or subtype');
  }
  return formula(value);
};

module.exports = { carbonFormulas, calculateEmission };

/**
 * Fisher–Yates shuffle to randomly shuffle an array in place.
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Creates a generator function that draws elements sequentially from a shuffled list.
 * When exhausted, the list is reshuffled automatically.
 * @param {Array} list - Array of items
 * @returns {Function} Generator function returning one item per call
 */
function shuffledPicker(list) {
  let pool = [...list];
  shuffle(pool);
  return function pick() {
    if (pool.length === 0) {
      pool = [...list];
      shuffle(pool);
    }
    return pool.pop();
  };
}

/**
 * Randomly assigns gender with equal probability.
 * @returns {string} "male" or "female"
 */
function assignGender() {
  return Math.random() < 0.5 ? "male" : "female";
}

/**
 * Generates a random birthdate given min and max age.
 * @param {number} minAge - Minimum age (inclusive)
 * @param {number} maxAge - Maximum age (exclusive)
 * @param {Date} today - Reference date (usually current date)
 * @returns {string} Birthdate as ISO string
 */
function generateBirthdate(minAge, maxAge, today) {
  const earliest = new Date(today);
  earliest.setFullYear(earliest.getFullYear() - maxAge);
  const latest = new Date(today);
  latest.setFullYear(latest.getFullYear() - minAge);

  const birthTimestamp = earliest.getTime() + Math.random() * (latest.getTime() - earliest.getTime());
  return new Date(birthTimestamp).toISOString();
}

/**
 * Randomly picks a workload from the set [10,20,30,40].
 * @param {Array<number>} workloads - List of allowed workload values
 * @returns {number} Selected workload
 */
function assignWorkload(workloads) {
  return workloads[Math.floor(Math.random() * workloads.length)];
}

/**
 * The main function which calls the application. 
 * Generates a list of employees with random gender, name, surname, birthdate, and workload.
 * @param {object} dtoIn contains count of employees and age limit of employees {min, max}
 * @returns {Array} of employee objects {gender, name, surname, birthdate, workload}
 */
export function main(dtoIn) {
  const dtoOut = [];
  const today = new Date();

  // 1. Input validation
  if (!Number.isInteger(dtoIn.count) || dtoIn.count <= 0) {
    throw new Error("Invalid input: count must be a positive integer.");
  }
  const { min: minAge, max: maxAge } = dtoIn.age;
  if (!Number.isInteger(minAge) || minAge < 14 || minAge > 99) {
    throw new Error("Invalid input: min age must be integer in [14,99]");
  }
  if (!Number.isInteger(maxAge) || maxAge < 14 || maxAge > 99) {
    throw new Error("Invalid input: max age must be integer in [14,99]");
  }
  if (minAge >= maxAge) {
    throw new Error("Invalid input: min age must be less than max age");
  }

  // Predefined lists
  const maleNames = ["Adam","Aleš","Alexandr","Bohumil","Bohdan","Branislav","Cyril","Ctibor","Daniel","David","Eduard","Emil","František","Filip","Gabriel","Gustav","Hynek","Hugo","Ivan","Ivo","Jan","Jiří","Josef","Karel","Kristián","Lukáš","Lubomír","Leo","Martin","Marek","Matěj","Norbert","Nikola","Otakar","Oliver","Petr","Patrik","Radek","Roman","Stanislav","Samuel","Šimon","Tomáš","Tadeáš","Václav","Viktor","Vladimír","Zikmund","Zdeněk","Zachariáš"];
  const femaleNames = ["Anna","Adéla","Agáta","Barbora","Božena","Beáta","Cecilie","Celestýna","Dagmar","Dominika","Eva","Eliška","Frida","Františka","Gabriela","Gita","Hana","Helena","Ivana","Irena","Jana","Jitka","Julie","Karolína","Kristýna","Klára","Lucie","Lenka","Lada","Marie","Markéta","Magdaléna","Nela","Nikola","Olga","Petra","Pavla","Renata","Radka","Simona","Soňa","Stella","Tereza","Tatiana","Veronika","Věra","Valerie","Zuzana","Zita","Zora"];
  const maleSurnames = ["Bartoš","Beneš","Beránek","Bílý","Čech","Černý","Doležal","Dvořák","Fiala","Hájek","Havlíček","Holub","Horák","Jelínek","Kadlec","Konečný","Kolář","Koubek","Krejčí","Kříž","Král","Kratochvíl","Mach","Matoušek","Marek","Moravec","Němec","Novák","Novotný","Pavelka","Pokorný","Procházka","Rada","Růžička","Sedláček","Šebesta","Šimek","Sýkora","Strnad","Vacek","Veselý","Volf","Vorel","Urban","Zahradník","Zelenka","Zvěřina","Zima","Zoufalý","Zeman"];
  const femaleSurnames = ["Adamcová","Bartošová","Bednářová","Bílá","Čechová","Černá","Doležalová","Dvořáková","Fialová","Hájková","Havlíčková","Holubová","Horáková","Jelínková","Kadlecová","Konečná","Kolářová","Hotová","Křížová","Králová","Kratochvílová","Machová","Matoušková","Marková","Moravcová","Nováková","Novotná","Pavlíková","Pokorná","Procházková","Růžičková","Drsná","Sedláčková","Šebestová","Šimková","Sýkorová","Strnadová","Vacková","Veselá","Volfová","Marešová","Urbanová","Zahradníková","Zelenková","Zimová","Zoufalá","Benešová","Beránková","Gottwaldová","Holečková"];
  const workloads = [10, 20, 30, 40];

  // Create shuffled pickers for names and surnames
  const pickMaleName = shuffledPicker(maleNames);
  const pickFemaleName = shuffledPicker(femaleNames);
  const pickMaleSurname = shuffledPicker(maleSurnames);
  const pickFemaleSurname = shuffledPicker(femaleSurnames);

  // 2. Employee generation
  for (let i = 0; i < dtoIn.count; i++) {
    const gender = assignGender();
    const name = gender === "male" ? pickMaleName() : pickFemaleName();
    const surname = gender === "male" ? pickMaleSurname() : pickFemaleSurname();
    const birthdate = generateBirthdate(minAge, maxAge, today);
    const workload = assignWorkload(workloads);

    dtoOut.push({ gender, name, surname, birthdate, workload });
  }

  return dtoOut;
}

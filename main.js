// Helper: randomly pick one element from a list
function randomPick(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

/**
 * The main function which calls the application. 
 * Generates a list of employees with random gender, name, surname, birthdate, and workload.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function main(dtoIn) {
  const dtoOut = [];

  // Predefined lists (constants)
  const maleNames = ["Adam", "Aleš", "Alexandr",
  "Bohumil", "Bohdan", "Branislav", "Cyril", "Ctibor", 
  "Daniel", "David", "Eduard", "Emil", "František",
  "Filip", "Gabriel", "Gustav", "Hynek", "Hugo",
  "Ivan", "Ivo", "Jan", "Jiří", "Josef", "Karel", "Kristián",
  "Lukáš", "Lubomír", "Leo", "Martin", "Marek", "Matěj",
  "Norbert", "Nikola", "Otakar", "Oliver", "Petr", "Patrik",
  "Radek", "Roman", "Stanislav", "Samuel", "Šimon",
  "Tomáš", "Tadeáš", "Václav", "Viktor", "Vladimír",
  "Zikmund", "Zdeněk", "Zachariáš"];
  const femaleNames = ["Anna", "Adéla", "Agáta","Barbora", "Božena",
  "Beáta", "Cecilie", "Celestýna",
  "Dagmar", "Dominika", "Eva", "Eliška",
  "Frida", "Františka", "Gabriela", "Gita",
  "Hana", "Helena","Ivana", "Irena",
  "Jana", "Jitka", "Julie",
  "Karolína", "Kristýna", "Klára",
  "Lucie", "Lenka", "Lada",
  "Marie", "Markéta", "Magdaléna","Nela", "Nikola",
  "Olga","Petra", "Pavla",
  "Renata", "Radka","Simona", "Soňa", "Stella",
  "Tereza", "Tatiana","Veronika", "Věra", "Valerie",
  "Zuzana", "Zita", "Zora"];
  const maleSurnames = ["Bartoš", "Beneš", "Beránek", "Bílý", "Čech",
  "Černý", "Doležal", "Dvořák", "Fiala", "Hájek",
  "Havlíček", "Holub", "Horák", "Jelínek", "Kadlec",
  "Konečný", "Kolář", "Koubek", "Krejčí", "Kříž",
  "Král", "Kratochvíl", "Mach", "Matoušek", "Marek",
  "Moravec", "Němec", "Novák", "Novotný", "Pavelka",
  "Pokorný", "Procházka", "Rada", "Růžička", "Sedláček",
  "Šebesta", "Šimek", "Sýkora", "Strnad", "Vacek",
  "Veselý", "Volf", "Vorel", "Urban", "Zahradník",
  "Zelenka", "Zvěřina", "Zima", "Zoufalý", "Zeman"];
  const femaleSurnames = ["Adamcová", "Bartošová", "Bednářová", "Bílá", "Čechová",
  "Černá", "Doležalová", "Dvořáková", "Fialová", "Hájková",
  "Havlíčková", "Holubová", "Horáková", "Jelínková", "Kadlecová",
  "Konečná", "Kolářová", "Hotová", "Křížová", "Králová",
  "Kratochvílová", "Machová", "Matoušková", "Marková", "Moravcová",
  "Nováková", "Novotná", "Pavlíková", "Pokorná", "Procházková",
  "Růžičková", "Drsná", "Sedláčková", "Šebestová", "Šimková",
  "Sýkorová", "Strnadová", "Vacková", "Veselá", "Volfová",
  "Marešová", "Urbanová", "Zahradníková", "Zelenková", "Zimová",
  "Zoufalá", "Benešová", "Beránková", "Gottwaldová", "Holečková"];
  const workloads = [10, 20, 30, 40];

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

  // 2. Employee generation iteration
  for (let i = 0; i < dtoIn.count; i++) {

    // 2.1 Determine gender (Bernoulli trial)
    const gender = Math.random() < 0.5 ? "male" : "female";

    // 2.2 Assign name and surname using randomPick helper
    let name, surname;
    if (gender === "male") {
      name = randomPick(maleNames);
      surname = randomPick(maleSurnames);
    } else {
      name = randomPick(femaleNames);
      surname = randomPick(femaleSurnames);
    }

    // 2.3 Generate birthdate
    const earliest = new Date(today);
    earliest.setFullYear(earliest.getFullYear() - maxAge);
    const latest = new Date(today);
    latest.setFullYear(latest.getFullYear() - minAge);

    const birthTimestamp = earliest.getTime() + Math.random() * (latest.getTime() - earliest.getTime());
    const birthdate = new Date(birthTimestamp).toISOString();

    // 2.4 Assign workload using randomPick helper
    const workload = randomPick(workloads);

    // 2.5 Add employee to output
    dtoOut.push({ gender, name, surname, birthdate, workload });
  }

  return dtoOut;
}

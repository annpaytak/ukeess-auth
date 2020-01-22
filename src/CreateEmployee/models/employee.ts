export class Employee {
  id?: string;
  name: string;
  company: string;
  position: string;
  dateOfHire: string;

  constructor(id: string, name: string, company: string, position: string, dateOfHire: string) {
    this.id = id;
    this.name = name;
    this.company = company;
    this.position = position;
    this.dateOfHire = dateOfHire;
  }
}
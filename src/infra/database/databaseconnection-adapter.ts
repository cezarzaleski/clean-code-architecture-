import DatabaseConnection from './database-connection';
import pgp from "pg-promise";

export default class DatabaseConnectionAdapter implements DatabaseConnection{
  pgp: any


  constructor() {
    this.pgp = pgp()('postgres://postgres:changeme@localhost:5432/app');
  }

  query(statement: string, params: any): any {
    return this.pgp.query(statement, params)
  }

}

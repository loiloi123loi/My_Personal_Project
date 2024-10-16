import dotenv from 'dotenv'
import { Collection, Db, MongoClient } from 'mongodb'
import User from '@/models/schemas/User.schemas'
import logger from '@/utils/logger'

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
dotenv.config({ path: `.env.${env}` })

const dbConnectionStr = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nodejs.kzpdxv2.mongodb.net/?retryWrites=true&w=majority&appName=Nodejs`

class DatabaseService {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(dbConnectionStr)
    this.db = this.client.db(process.env.DATABASE_NAME)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      logger.info('Server successfully connected to MongoDB!')
    } catch (err) {
      logger.error('Error connecting to MongoDB:', err)
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService

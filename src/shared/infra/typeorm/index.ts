import 'dotenv/config';
import { createConnections } from 'typeorm';

import { config } from '../../../config/db-postgres';

createConnections([config]);

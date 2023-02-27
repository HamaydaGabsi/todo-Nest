import { Global, Module } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Global()
@Module({
providers:[{useValue:uuidv4,provide:"uuidProvider"}],
exports:[{useValue:uuidv4,provide:"uuidProvider"}]
})
export class CommonModule {

}

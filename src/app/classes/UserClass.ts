import { alpha, email, required } from "@rxweb/reactive-form-validators";

export class User{

@required()
@email()
email: string;

@required()
@alpha()
firstName: string;

@required()
@alpha()
lastName: string;
}


import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService, Todo } from '../API.service';

import { Amplify } from 'aws-amplify';

const myAppConfig = {
  // ...
  aws_appsync_graphqlEndpoint:
    'https://xxxxxxx.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'AWS_IAM',
  aws_cognito_identity_pool_id:
    'us-east-1:xxxxx',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_xxxxxx',
  aws_user_pools_web_client_id: 'xxxxxxxxx',
  // ...
};

Amplify.configure(myAppConfig);

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  public createForm: FormGroup;
  public todos: Array<Todo> = [];
  constructor(private api: APIService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
    });
  }
  async ngOnInit() {
    /* fetch restaurants when app loads */
    this.api.ListTodos().then((event) => {
      this.todos = event.items as Todo[];
    });
  }
}

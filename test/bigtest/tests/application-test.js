import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import ApplicationInteractor from '../interactors/application';

describe('Application', () => {
  const app = new ApplicationInteractor();

  setupApplication();

  beforeEach(function () {
    this.visit('ldp');
  });

  // it('shows a greeting message', () => {
  //   expect(app.greetingMessage).to.equal('Congratulations!');
  // });

});

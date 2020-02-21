import { describe, it } from 'mocha';
import { expect } from 'chai';
import tpl_index from '../index';

describe('tpl_index template test', function () {
  it('type checking', function () {
    expect(tpl_index).to.be.a('object');
  });
});
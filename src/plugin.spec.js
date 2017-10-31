import React from 'react';
import { mount } from 'enzyme';
import { StoreConnector } from 'hadron-react-components';
import WootPluginPlugin from './plugin';

describe('WootPlugin [Plugin]', () => {
  let component;

  beforeEach((done) => {
    component = mount(<WootPluginPlugin />);
    done();
  });

  afterEach((done) => {
    component = null;
    done();
  });

  it('should contain a <StoreConnector /> with a store prop', () => {
    expect(component.find(StoreConnector).first().props('store')).to.be.an('object');
  });
});

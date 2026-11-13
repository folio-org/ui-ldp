import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFieldArray } from 'react-final-form-arrays';
import { Pluggable, useStripes } from '@folio/stripes/core';
import { Row, Col, MultiColumnList, IconButton, Label } from '@folio/stripes/components';
import { getFullName } from '@folio/stripes/util';
import useUsersByIds from '../util/useUsersByIds';
import css from './Settings.css';


const visibleColumns = ['fullName', 'username', 'barcode', 'actions'];
const columnMapping = {
  fullName: <FormattedMessage id="ui-ldp.settings.tqrepos.users.name" />,
  username: <FormattedMessage id="ui-ldp.settings.tqrepos.users.username" />,
  barcode: <FormattedMessage id="ui-ldp.settings.tqrepos.users.barcode" />,
  actions: '',
};
const columnWidths = {
  fullName: '40%',
  username: '20%',
  barcode: '30%',
  actions: '10%',
};


function RepoUsers({ name }) {
  const { fields } = useFieldArray(name);
  const intl = useIntl();
  const stripes = useStripes();
  const ids = fields.value || [];
  const { usersById, isLoading, error, addUsers } = useUsersByIds(ids);

  const selectUsers = (selected) => {
    addUsers(selected);
    const seen = new Set(ids);
    selected.forEach(u => {
      if (!seen.has(u.id)) {
        seen.add(u.id);
        fields.push(u.id);
      }
    });
  };

  const contentData = ids.map((id, index) => {
    const user = usersById[id];
    return {
      id,
      index,
      fullName: user ? getFullName(user) : (user === null ? id : ''),
      username: user?.username,
      barcode: user?.barcode,
    };
  });

  const formatter = {
    actions: item => (
      <IconButton
        icon="trash"
        onClick={() => fields.remove(item.index)}
        ariaLabel={intl.formatMessage({ id: 'ui-ldp.settings.tqrepos.users.remove' })}
      />
    ),
  };

  return (
    <>
      <Row>
        <Col xs={9}>
          <Label>
            <FormattedMessage id="ui-ldp.settings.tqrepos.users" />
          </Label>
        </Col>
        <Col xs={3} className={css.assignUsers}>
          {/*
            The plugin's modal is rendered in a portal, but React events
            still bubble through the component tree, so a submit from the
            plugin's search form would otherwise reach the settings form.
          */}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div onSubmit={e => e.stopPropagation()}>
            <Pluggable
              aria-haspopup="true"
              searchButtonStyle="default"
              searchLabel={<FormattedMessage id="ui-ldp.settings.tqrepos.users.assign" />}
              stripes={stripes}
              type="find-user"
              selectUsers={selectUsers}
            >
              <FormattedMessage id="ui-ldp.settings.tqrepos.users.assign.notAvailable" />
            </Pluggable>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {error ?
            <FormattedMessage id="ui-ldp.settings.tqrepos.users.error" values={{ error: error.message }} />
            :
            <MultiColumnList
              contentData={contentData}
              formatter={formatter}
              visibleColumns={visibleColumns}
              columnMapping={columnMapping}
              columnWidths={columnWidths}
              loading={isLoading}
              isEmptyMessage={<FormattedMessage id="ui-ldp.settings.tqrepos.users.none" />}
              interactive={false}
            />
          }
        </Col>
      </Row>
    </>
  );
}

RepoUsers.propTypes = {
  name: PropTypes.string.isRequired,
};


export default RepoUsers;

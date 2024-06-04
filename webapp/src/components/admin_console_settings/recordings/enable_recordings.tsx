// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, { ChangeEvent, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { setRecordingsEnabled } from 'src/actions';
import {
    LabelRow,
    leftCol,
    rightCol,
} from 'src/components/admin_console_settings/common';
import { CustomComponentProps } from 'src/types/mattermost-webapp';

const EnableRecordings = (props: CustomComponentProps) => {
    const dispatch = useDispatch();

    // @ts-ignore -- this is complaining b/c value is supposed to be string, but... it can be bool!
    const [enabled, setEnabled] = useState(() => props.value === 'true' || props.value === true);

    // Update global state with a local state change, or props change (eg, remounting)
    useEffect(() => {
        dispatch(setRecordingsEnabled(enabled));
    }, [dispatch, enabled]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(props.id, e.target.value === 'true');
        setEnabled(e.target.value === 'true');
    };

    return (
        <div data-testid={props.id} className='form-group'>
            <div className={'control-label ' + leftCol}>
                <LabelRow>
                    <label data-testid={props.id + 'label'} htmlFor={props.id}>
                        {props.label}
                    </label>
                </LabelRow>
            </div>
            <div className={rightCol}>
                <a id={props.id} />
                <label className='radio-inline'>
                    <input
                        data-testid={props.id + 'true'}
                        id={props.id + 'true'}
                        type={'radio'}
                        value='true'
                        checked={Boolean(props.value)}
                        onChange={handleChange}
                        disabled={props.disabled}
                    />
                    <FormattedMessage defaultMessage='true' />
                </label>

                <label className='radio-inline'>
                    <input
                        data-testid={props.id + 'false'}
                        id={props.id + 'false'}
                        type={'radio'}
                        value='false'
                        checked={Boolean(!props.value)}
                        onChange={handleChange}
                        disabled={props.disabled}
                    />
                    <FormattedMessage defaultMessage='false' />
                </label>

                <div data-testid={props.id + 'help-text'} className='help-text'>
                    {props.helpText}
                </div>
            </div>
        </div>
    );
};

export default EnableRecordings;

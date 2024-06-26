import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import {
    LabelRow,
    leftCol,
    rightCol,
} from 'src/components/admin_console_settings/common';
import manifest from 'src/manifest';
import { recordingsEnabled, transcriptionsEnabled } from 'src/selectors';
import { CustomComponentProps } from 'src/types/mattermost-webapp';

const TranscriberNumThreads = (props: CustomComponentProps) => {
    const hasTranscriptions = useSelector(transcriptionsEnabled);
    const recordingEnabled = useSelector(recordingsEnabled);

    if (!hasTranscriptions || !recordingEnabled) {
        return null;
    }

    // Webapp doesn't pass the options
    const theDefault =
        manifest.settings_schema?.settings.find(
            (e) => e.key === 'TranscriberNumThreads',
        )?.default || '';

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(props.id, parseInt(e.target.value, 10));
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
                <input
                    data-testid={props.id + 'number'}
                    id={props.id}
                    className='form-control'
                    type={'number'}
                    placeholder={theDefault}
                    value={props.value}
                    onChange={handleChange}
                    disabled={props.disabled}
                />
                <div data-testid={props.id + 'help-text'} className='help-text'>
                    {props.helpText}
                </div>
            </div>
        </div>
    );
};

export default TranscriberNumThreads;

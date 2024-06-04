import { GlobalState } from '@mattermost/types/store';
import { getCurrentChannel } from 'mattermost-redux/selectors/entities/channels';
import { isCurrentUserSystemAdmin } from 'mattermost-redux/selectors/entities/users';
import { connect } from 'react-redux';
import {
    callsShowButton,
    channelIDForCurrentCall,
    maxParticipants,
    profilesInCallInCurrentChannel,
} from 'src/selectors';

import ChannelHeaderDropdownButton from './component';

const mapStateToProps = (state: GlobalState) => {
    const channel = getCurrentChannel(state);

    return {
        show: callsShowButton(state, channel?.id),
        inCall: Boolean(
            channelIDForCurrentCall(state) &&
                channelIDForCurrentCall(state) === channel?.id,
        ),
        hasCall: profilesInCallInCurrentChannel(state).length > 0,
        isAdmin: isCurrentUserSystemAdmin(state),
        isCloudStarter: false,
        isCloudPaid: true,
        isLimitRestricted: false,
        maxParticipants: maxParticipants(state),
        isChannelArchived: channel?.delete_at > 0,
    };
};

export default connect(mapStateToProps)(ChannelHeaderDropdownButton);

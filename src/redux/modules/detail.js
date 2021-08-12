import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import socketIOClient from 'socket.io-client';
import apis from '../../shared/api';

// redux
import { ToastCreators } from './toastMessage';

// socket
const ENDPOINT = 'https://soujinko.shop/';
const socket = socketIOClient(ENDPOINT);

const LOAD = 'detail/LOAD';
const MYTRAVELE_LOAD = 'detail/MYTRAVEL_LOAD';
const SUCCESS = 'detail/SUCCESS';
const LIKEUPDATE = 'detail/LIKEUPDATE';

const DetailLoad = createAction(LOAD, (userInfo, tripInfo) => ({
  userInfo,
  tripInfo,
}));
const MyTravelLoad = createAction(MYTRAVELE_LOAD, myTrip => ({ myTrip }));
const LikeUpdate = createAction(LIKEUPDATE, like => ({ like }));

const initialState = {
  userInfo: {},
  tripInfo: [],
  myTripInfo: [],
};

const DetailLoadDB = userPk => {
  return dispatch => {
    apis
      .UserDetail(userPk)
      .then(res => {
        const data = res.data;
        dispatch(DetailLoad(data.userInfo, data.tripInfo));
      })
      .catch(err => console.error(err));
  };
};

const MyTripInfoDB = () => {
  return dispatch => {
    apis
      .MyPromise()
      .then(res => {
        const data = res.data;
        dispatch(MyTravelLoad(data));
        dispatch(SuccessValue(false));
      })
      .catch(err => console.error(err));
  };
};

const AddTravel = (TripInfo, userPk) => {
  return (dispatch, getState, { history }) => {
    apis
      .GuideRequest(TripInfo)
      .then(res => {
        socket.emit('request', { uid: userPk });
        dispatch(ToastCreators.Message(true));
        history.goBack();
      })
      .catch(err =>
        window.alert('선택한 여행일정은 해당유저에게 이미 신청하셨습니다.'),
      );
  };
};

const AddGuide = (TripInfo, userPk) => {
  return dispatch => {
    apis
      .DoGuide({ tripId: TripInfo })
      .then(res => {
        socket.emit('request', { uid: userPk });
        dispatch(ToastCreators.Message(true));
      })
      .catch(err => {
        window.alert(err.response.data.errorMessage);
      });
  };
};

const LikeUpdateHandler = like => {
  return dispatch => {
    dispatch(LikeUpdate(like));
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, draft => {
        draft.userInfo = action.payload.userInfo;
        draft.tripInfo = action.payload.tripInfo;
      }),
    [MYTRAVELE_LOAD]: (state, action) =>
      produce(state, draft => {
        draft.myTripInfo = action.payload.myTrip;
      }),
    [SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.success = action.payload.success;
      }),
    [LIKEUPDATE]: (state, action) =>
      produce(state, draft => {
        draft.userInfo.like = action.payload.like;
      }),
  },
  initialState,
);

const DetailCreators = {
  DetailLoadDB,
  MyTripInfoDB,
  AddTravel,
  AddGuide,
  LikeUpdateHandler,
};

export { DetailCreators };

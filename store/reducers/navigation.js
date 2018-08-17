import {login, register} from '../Actions/actionType'
import { NavigationActions} from 'react-navigation'
import {AppNavigator} from '../../component/Navigator/AppNavigation'

const router = AppNavigator.router;

const initialAction = router.getActionForPathAndParams('SignIn');
const initialState = router.getStateForAction(initialAction);


export default navigationReducer = (state = initialState, action) => {
    let nextState;
  
    switch(action.type){
        case 'SignUp':
            nextState = router.getStateForAction(
                NavigationActions.navigate({ routeName: 'SignUp' }),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
    }
    return nextState || state

}
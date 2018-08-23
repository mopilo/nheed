import React, { PureComponent } from 'react';
import { CardItem, Thumbnail, Button } from 'native-base';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    NetInfo,
    AsyncStorage,
    ToastAndroid,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    RefreshControl,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { CachedImage,   } from 'react-native-cached-image';
import {connect} from 'react-redux'
import {isConnected} from '../../store/Actions/isConnected'
import {fetchHomeRequest} from '../../store/Actions/index'

class Home extends PureComponent {

    //static navigation to hold nav icons and titles
    static navigationOptions = ({  }) => {
        // const { params = {} } = navigation.state
        return {
            // headerRight: (
            //     <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10}}>
            //         <MIcon name='bell' size={23} color='black' onPress={()=> alert('Notification')} style={{margin: 4}}/>
            //         <TouchableNativeFeedback onPress={()=> navigation.navigate('MyProfile')}>
            //             <CachedImage
            //                 source={{ uri: params.imageUri }}
            //                 style={{ width: 30, height: 30, borderRadius: 5}}
            //             />
            //         </TouchableNativeFeedback>
                    
            //     </View>
            // ),
            header: null
        }
    };

    constructor(props){
        super(props)
        this.state = {
            textInputs: [],
            comment: '',
            lastPress: 0,
            liked: '',
            likedddd: [],
            isLoading: false,
            disabled: false,
            volume: 0,
            refresh: false
            // view: ''
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
        this.props.homeRequest()
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }

    _handleConnectionChange = (isConnected) => {
        this.props.network({status: isConnected})
    };

    
    userProfile =  (item) => {

    }
    

    //re-renders to show like
    // reRender = (photoId) => {
    //     const url = REQUEST_URL + HOME_URL + this.state.userId + HOME_URL_LAST;
    //     fetch(url, {
    //         headers: {
    //             'content-type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': `Bearer ${this.state.token}`
    //         }
    //     })
    //         .then(res => { return res.json() })
    //         .then((resData) => {
    //             if (resData.message) {
    //                 ToastAndroid.showWithGravity(
    //                     resData.message,
    //                     ToastAndroid.SHORT,
    //                     ToastAndroid.CENTER
    //                 );
    //             }
    //             else {
    //                 this.setState({
    //                     data: resData.data
    //                 })
    //             }

    //             return resData;
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    // }


    // listPost = (photoId) => {
    //     this.props.navigation.navigate('ListPost', {index: photoId, profilePic: this.state.res.profile_picture})
    // }

    // DetailPage = (user) => {
    //     this.props.navigation.navigate('DetailPage', {index: user})
    // }


    onRefresh = () => {
        this.setState({refresh: true});
        this.fetchData()
    }

    //item from flat list
    renderItem = ({ item, index }) => {
        // let isViewable = this.state.view
        // let time = item.inserted_at;
        // let utcDate = time;
        // let localDate = new Date(utcDate);
        // let now = moment(localDate, 'YYYY-MM-DDTHH:mm:ss').fromNow(true);
        return (
            <View style={{flex:1, backgroundColor: '#fff'}}>
            {/* card */}
            <View style={{marginBottom: 5, borderBottomWidth: 0.5, padding: 10, borderBottomColor: '#d3d3d3'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                    <View style={{flex: 0.8, margin: 10}}>
                        <TouchableOpacity onPress={this.userProfile.bind(this, item.account.id)}>
                            <Thumbnail square source={{ uri: item.account.profile_picture }} style={{ height: 30, width: 30, borderRadius: 5 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 4}}>
                        <Text note style={{ fontSize: 12, fontFamily: 'Lato-Bold', color: '#000' }}>{item.account.name}</Text>
                    </View>

                    <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center', margin: 4}}>
                            <TouchableNativeFeedback onPress={()=> this.DetailPage(item.account.id)}>
                                <View style={{borderRadius: 50, height: 50, width: 50, borderColor: '#000', borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginRight: 8}}>
                                    <Text style={{fontFamily: 'Lato-Regular', fontSize: 14, alignSelf: 'center'}}>{this.state.newMedia}</Text>
                                </View>
                            </TouchableNativeFeedback>
                    </View>

                </View>
                
            </View>
        </View>
        )
    }

    render() {
        return (
            this.props.isLoading ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={true} size="small" color="#000" />
            </View>
            :
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item.id.toString()}
                    extraData={this.state}
                    refreshControl = {
                        <RefreshControl
                            refreshing={this.state.refresh}
                            onRefresh={this.onRefresh}
                        />
                    }
                />
            
            </View>
        );
    }
}

//styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', //1b0f28
        alignContent: 'center',
        justifyContent: 'center'
    },
    tabBar: {
        flex: 1,
        backgroundColor: 'white',
        height: 60,
        borderBottomWidth: 0.5,
        borderColor: '#E5E5E5',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10
    },
    volume: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'transparent',
        padding: 6
    }
});

const mapStateToProps = state => {
    return {
      isLoading: state.ui.isLoading,
      isConnected: state.isConnected.isConnected,
      data: state.HomeReducer.data
    };
};
  
  const mapDispatchToProps = dispatch => {
    return {
        // onTryAuth: (authData) => dispatch(loginUser(authData)),
        homeRequest: () => dispatch(fetchHomeRequest()),
        network: (status) => dispatch(isConnected(status))
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Home);

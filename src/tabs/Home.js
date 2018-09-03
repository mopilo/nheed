import React, { PureComponent } from 'react';
import { CardItem, Thumbnail, Button } from 'native-base';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    NetInfo,
    TouchableOpacity,
    TouchableNativeFeedback,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import { CachedImage} from 'react-native-cached-image';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from 'react-redux'
import {isConnected} from '../../store/Actions/isConnected'
import {fetchHomeRequest, fetchProfile, fetchMyProfile, fetchPostDetails} from '../../store/Actions/index'

class Home extends PureComponent {

    //static navigation to hold nav icons and titles
    static navigationOptions = ({navigation }) => {
        const { params = {} } = navigation.state
        return {
            headerRight: (
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10}}>
                    <MIcon name='bell' size={23} color='black' onPress={()=> alert('Notification')} style={{margin: 4}}/>
                    <TouchableNativeFeedback onPress={()=> navigation.navigate('MyProfile')}>
                        <CachedImage
                            source={{ uri: params.pic }}
                            style={{ width: 30, height: 30, borderRadius: 5}}
                        />
                    </TouchableNativeFeedback>    
                </View>
            ),
            headerLeft: null
        }
    };

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
        this.props.myProfile()
        this.props.homeRequest()
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }

    _handleConnectionChange = (isConnected) => {
        this.props.network({status: isConnected})
    };

    componentWillReceiveProps(nextProps) {
        if ( nextProps.pic != this.props.pic) {
            this.props.navigation.setParams({ 'pic': nextProps.pic });
        }
    }

    userProfile = (item) => {
        this.props.viewProfile(item)
    }

    DetailPage = (user) => {
        // this.props.navigation.navigate('DetailPage', {index: user})
        this.props.detailPage(user)
        console.log(user)
    }

    onRefresh = () => {
        this.props.homeRequest()
    }

    //item from flat list
    renderItem = ({ item, index }) => {
        return (
            <View style={{flex:1, backgroundColor: '#fff'}}>
            {/* card */}
            <View style={{marginBottom: 5, borderBottomWidth: 0.5, padding: 10, borderBottomColor: '#d3d3d3'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                    <View style={{flex: 0.8, margin: 10}}>
                        <TouchableOpacity onPress={this.userProfile.bind(this, item.account_id)}>
                            <Thumbnail square source={{ uri: item.profile_picture }} style={{ height: 30, width: 30, borderRadius: 5 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 4}}>
                        <Text note style={{ fontSize: 12, fontFamily: 'Lato-Bold', color: '#000' }}>{item.account_name}</Text>
                    </View>

                    <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center', margin: 4}}>
                            <TouchableNativeFeedback onPress={()=> this.DetailPage(item.account_id)}>
                                <View style={{borderRadius: 50, height: 40, width: 40, borderColor: '#000', borderWidth: 0.7, alignItems: 'center', justifyContent: 'center', marginRight: 8}}>
                                    <Text style={{fontFamily: 'Lato-Regular', fontSize: 14, alignSelf: 'center'}}>{item.post_count}</Text>
                                </View>
                            </TouchableNativeFeedback>
                    </View>

                </View>
                
            </View>
        </View>
        )
    }

    render() {
        console.log('testing',this.props.data)
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
                    keyExtractor={(item, index) => item.user_id.toString()}
                    // extraData={this.state}
                    refreshControl = {
                        <RefreshControl
                            refreshing={this.props.isLoading}
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
      data: state.homeReducer.data,
      pic: state.homeReducer.pic
    };
};
  
  const mapDispatchToProps = dispatch => {
    return {
        homeRequest: () => dispatch(fetchHomeRequest()),
        network: (status) => dispatch(isConnected(status)),
        myProfile: () => dispatch(fetchProfile()),
        viewProfile: (item) =>  dispatch(fetchMyProfile(item)),
        detailPage: (user) => dispatch(fetchPostDetails(user))
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Home);

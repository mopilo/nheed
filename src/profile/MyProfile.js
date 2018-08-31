import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    Dimensions,
    ToastAndroid,
    NetInfo,
    ActivityIndicator
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Header, Content, Tab, Tabs, Text, View, TabHeading } from 'native-base';
import {connect} from 'react-redux';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CachedImage } from 'react-native-cached-image';
import {fetchEditProfile} from '../../store/Actions/index'
import {REQUEST_URL, HOME_POST, HOME_URL} from '../../component/Utility/local'

//Tabs
import TabThree from './profileTabs/TabThree';
import TabTwo from './profileTabs/TabTwo';
import TabOne from './profileTabs/TabOne'

const { width } = Dimensions.get('window')


class MyProfile extends Component {
    //header
    static navigationOptions = {
        headerRight: <MIcon name ='finance' size={20} color='black' style={{ margin: 10 }} /> 
    };

    //state to hold initial data
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            image: '',
            nheedersTotal: '',
            nheedsTotal: '',
            bio: '',
            name: '',
            res: [],
            page: 0,
            isloading: false
        }
        this.onChangeTab = this.onChangeTab.bind(this)
    }

    // a lifeCycle component used to render data before screen loads
    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
        this.onChangeTab()
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }

    _handleConnectionChange = (isConnected) => {
        this.props.network({status: isConnected})
    };
   
    //function call to navigate to edit screen
    editProfile = () => {
        this.props.navigation.navigate('EditProfile')
    }

    onChangeTab() {
        
        const token =this.props.token
        const userId = this.props.userId
        const url = REQUEST_URL + HOME_URL + userId + HOME_POST
        fetch(url, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => { return res.json() })
            .then((resData) => {
                const play = resData.data;
                const videoResult = play.filter(media => media.post_type === 'video');
                const imageResult = play.filter(media => media.post_type === 'image');
                this.setState({
                    totalPost: resData.data,
                    isloading: false,
                    totalMedia: Object.keys(resData.data).length,
                    totalVideos: Object.keys(videoResult).length,
                    totalImages: Object.keys(imageResult).length,
                    videoResult: videoResult,
                    imageResult: imageResult
                })
                // console.log(this.state.totalPost)
                return resData
            })
            .catch(() => {
                this.setState({ isloading: false })
                console.log('error')
            })
    }

    render() {
        let myProfile = this.props.data
        let nheeders = myProfile.following;
        let nheeds = myProfile.followers;
        // console.log("post", this.state.totalPost)
        return (
            <Container>
                <ScrollView style={{ flex: 1, backgroundColor: '#fff', alignContent: 'center' }}>
                    <View style={styles.container}>
                        <View style={styles.topProfile}>
                            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                                <Text style={{ fontSize: 25, fontFamily: 'Lato-Bold', color: '#000' }}>{nheeders}</Text>
                                <Text note style={{ fontSize: 12, fontFamily: 'Lato-Light', color: '#000' }}>{nheeders > 1 ? 'Nheeders' : 'Nheeder'}</Text>
                            </View>

                            {/* PROFILE IMAGE */}
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <View style={{ width: 100, height: 100, padding: 20, borderWidth: 2, borderColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
                                    <CachedImage source={{ uri: myProfile.profile_picture }}
                                        style={{ width: 95, height: 95}} />
                                </View>
                                <Text style={{ fontSize: 12, textAlign: 'center', color: '#000' }}>{myProfile.name}</Text>
                            </View>
                            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                                <Text style={{ fontSize: 25, fontFamily: 'Lato-Bold', color: '#000' }}>{nheeds}</Text>
                                <Text note style={{ fontSize: 12, fontFamily: 'Lato-Light', color: '#000' }}>{nheeds > 1 ? 'Nheeds' : 'Nheed'}</Text>
                            </View>

                        </View>

                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text note style={{ fontSize: 12, textAlign: 'center', fontFamily: 'Lato-Regular', color: '#000'}}>{myProfile.bio}</Text>
                            <Text note style={{ fontSize: 12, textAlign: 'center', fontFamily: 'Lato-Regular', color: '#000'}}>{myProfile.url ? myProfile.url : ''}</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={this.editProfile} style={styles.editProfileBtn}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Lato-Bold', color: '#000' }}> Edit Profile </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    {/*        *****************          BEGINNING OF TABS     ****************                */}
                    <Tabs initialPage={0} tabBarUnderlineStyle={{ backgroundColor: 'transparent' }} locked={true} onChangeTab={({ i }) => { this.setState({ page: i }), this.onChangeTab }} style={{ margin: 10 }}>

                        {/* FIRST TAB HEADING */}
                        <Tab heading={<TabHeading style={this.state.page === 0 ? styles.activeTabStyle : styles.tabStyle}>
                            <MIcon name="play-box-outline" size={33} color={this.state.page === 0 ? '#000' : 'grey'} />
                            {/* <Image source={require('../../assets/tv.png')} style={{height: 25, width: 25}}/> */}
                            <View style={{ padding: 5, alignItems: 'flex-start' }}>
                                <Text style={this.state.page === 0 ? styles.activeTextStyle : styles.textStyle}>{this.state.totalVideos}</Text>
                                <Text style={this.state.page === 0 ? styles.activeTextStyle : styles.textStyle}>{this.state.totalVideos > 1 ? 'videos' : 'video'}</Text>
                            </View>
                        </TabHeading>}>
                            <TabOne totalPost={this.state.videoResult} isloading={this.state.isloading} video={this.state.totalVideos} />
                        </Tab>

                        {/* SECOND TAB HEADING */}
                        <Tab heading={<TabHeading style={this.state.page === 1 ? styles.activeTabStyle : styles.tabStyle}>
                            <Icon name="image" size={30} color={this.state.page === 1 ? '#000' : 'grey'} />
                            <View style={{ padding: 5, alignItems: 'flex-start' }}>
                                <Text style={this.state.page === 1 ? styles.activeTextStyle : styles.textStyle}>{this.state.totalImages}</Text>
                                <Text style={this.state.page === 1 ? styles.activeTextStyle : styles.textStyle}>{this.state.totalImages > 1 ? 'images' : 'image'}</Text>
                            </View>
                        </TabHeading>}>
                            <TabTwo totalPost={this.state.imageResult} isloading={this.state.isloading} />
                        </Tab>

                        {/* THIRD TAB HEADING */}
                        <Tab heading={<TabHeading style={this.state.page === 2 ? styles.activeTabStyle : styles.tabStyle}>
                            <View style={{ padding: 5, alignItems: 'center' }}>
                                <Text style={this.state.page === 2 ? styles.activeTextStyle : styles.textStyle}>{this.state.totalMedia}</Text>
                                <Text style={this.state.page === 2 ? styles.activeTextStyle : styles.textStyle}>{this.state.totalMedia > 1 ? 'Total clips' : 'Total clip'}</Text>
                            </View>
                        </TabHeading>}>
                            <TabThree totalPost={this.state.totalPost} isloading={this.state.isloading} />
                        </Tab>

                        {/* END OF TABS */}
                    </Tabs>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        backgroundColor: '#fff'
    },
    topProfile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        flex: 1,
    },
    editProfileBtn: {
        alignSelf: 'center',
        margin: 20,
        borderWidth: 2,
        width: '30%',
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        borderColor: '#251b33'
    },
    profileOptions: {
        height: 60, borderWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1
    },
    tabStyle: {
        backgroundColor: '#fff',
    },
    activeTabStyle: {
        backgroundColor: 'grey',
    },
    activeTextStyle: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 11,
        letterSpacing: 2
    },
    textStyle: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 9
    },
    activeTextStyleBelow: {
        fontFamily: 'Lato-Light',
        fontSize: 11,
        letterSpacing: 30
    },
    textStyleBelow: {
        fontFamily: 'Lato-Light',
        fontSize: 11,
        letterSpacing: 30
    }
});


const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        isConnected: state.isConnected.isConnected,
        data: state.editProfileReducer.editData,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        network: (status) => dispatch(isConnected(status)),
        storedProfile: () => dispatch(fetchEditProfile())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    NetInfo,
    TouchableOpacity,
    Dimensions,
    RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Video from 'react-native-video';
import { CachedImage } from 'react-native-cached-image';
import { connect } from 'react-redux';
import {isConnected} from '../../store/Actions/isConnected'
import {fetchExplore, fetchListPost} from '../../store/Actions/index'

const { width } = Dimensions.get('window')
const numColumns = 3;

class Explore extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return{
            headerRight: (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name= 'search' size={23} color='#000000' style={{margin: 6}} onPress={()=>{navigation.navigate('Search')}}/>
                    <MIcon name='dots-vertical' size={23} color='black' onPress={()=> alert('Notification')} style={{margin: 4}}/>
                    <TouchableOpacity onPress={() => { navigation.navigate('MyProfile') }}>
                        <CachedImage
                            source={{ uri: params.pic }}
                            style={{ width: 30, height: 30, borderRadius: 5}}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
    };

    // async requestStoragePermission() {
    //     const chckStoragePermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    //     const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    //     const chckCameraPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
    //     const recordPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);

    //     if (chckStoragePermission  && chckLocationPermission && chckCameraPermission && recordPermission === PermissionsAndroid.RESULTS.GRANTED) {
    //         console.log("You've access for the storage");
    //     } else {
    //         try {
    //             const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //                 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.CAMERA,
    //                 PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    //             ],             
    //             )
    //             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                 console.log("You've access for the storage");
    //             } else {
    //                 console.log("You don't have access for the storage");
    //             }
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    // };

    formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);

        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) 
        {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }
        return data;
    };

    componentDidMount() {
        // this.requestStoragePermission()
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
        this.props.explorePage()
        this.props.navigation.setParams({ 'pic': this.props.pic });
    }


    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }

    // for network check
    _handleConnectionChange = (isConnected) => {
        this.props.network({status: isConnected})
    };

    // this methods holds both images and videos
    renderElement = (item) => {
        if (item.post_type === "video") {
            return <Video
                source={{ uri: item.url }}
                style={{ height: width/3.1, width: width/3.1}}
                resizeMode="cover"
                volume={0}
                repeat={true}
                playInBackground={false}
                playWhenInactive={false}
            />;
        }
        else {
            return <CachedImage  onError={({ nativeEvent: {error} }) => console.log(error)} source={{ uri: item.url }} style={{ height: width/3.1, width: width/3.1,  }} resizeMode="cover"/>;
        }
        return null;
    }

    listPost = (item) => {
        this.props.tabPost(item.id)
        // this.props.navigation.navigate('ListPost', {index: item.id, profilePic: this.state.res.profile_picture})
    }
    onRefresh = () => {
        this.props.explorePage()
    }

    renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', margin: 2 }}>
                <TouchableOpacity onPress={this.listPost.bind(this, item)}>
                    {this.renderElement(item)}
                </TouchableOpacity>
            </View>
        )
    }

    render() {          
        return (
            this.props.isLoading
                ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#fff' }}>
                <ActivityIndicator animating={true} size="small" color="#000" />
            </View>
                :
            <View style={styles.container}>
                <FlatList
                    data={this.formatData(this.props.explore, numColumns)}
                    renderItem={this.renderItem}
                    numColumns={3}
                    keyExtractor={(item, index) => item.id}
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
        backgroundColor: '#fff'
    }
});


const mapStateToProps = state => {
    return{
        isLoading: state.ui.isLoading,
        isConnected: state.isConnected.isConnected,
        pic: state.homeReducer.pic,
        explore: state.exploreReducer.exploreData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        explorePage: () => dispatch(fetchExplore()),
        network: (status) => dispatch(isConnected(status)),
        tabPost: (item) => dispatch(fetchListPost(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);

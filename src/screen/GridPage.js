import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    ActivityIndicator,
    AsyncStorage,
    NetInfo,
    TouchableOpacity,
    PermissionsAndroid,
    Dimensions,
    RefreshControl
} from 'react-native';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Video from 'react-native-video';
import { CachedImage } from 'react-native-cached-image';

const { width } = Dimensions.get('window')
const numColumns = 3;

class GridPage extends Component {

    static navigationOptions = ({ navigation, transitioning }) => {
        const params = navigation.state.params || {};
        return{
            headerLeft:
            (
                <TouchableOpacity disabled={transitioning} onPress={() => { navigation.navigate('MyProfile') }}>
                    <View style={{ width: 40, height: 40, padding: 10, margin: 4, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                        <CachedImage
                            source={{ uri: params.imageUri }}
                            style={{ width: 30, height: 30, borderRadius: 5}}
                        />
                    </View>

                </TouchableOpacity>
                
            ),
            headerRight: (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name= 'search' size={23} color='#000000' style={{margin: 10}} onPress={()=>{navigation.navigate('Search')}}/>
                    {/* <Icon name= 'more-vertical' size={23} style={{margin: 10}} onPress={()=>{navigation.navigate('PlayTab')}}/> */}
                    <MIcon name='dots-vertical' size={23} color='black' onPress={()=> alert('Notification')} style={{margin: 4}}/>
                </View>
            )
        }
    };

    state = {
        isLoading: false,
        dataSource: []
    }


 formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

    componentDidMount() {
        // CHECKING FOR INTERNET CONNECTION
        // NetInfo.isConnected.fetch().then(isConnected => {
        //     if (!isConnected) {
        //         alert('Device Offline')
        //     }
        //     else {
        //         this.setState({ isLoading: true }, this.fetchData)
        //     }
        // })
    }

    // profile = () => {
    //     AsyncStorage.multiGet(['token', 'userId']).then(stores => {
    //         const token = stores[0][1];
    //         const userId = stores[1][1];
    //         const url = REQUEST_URL + HOME_URL + userId;

    //         if (token) {
    //             fetch(url, {
    //                 headers: {
    //                     'content-type': 'application/json',
    //                     'Accept': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             })
    //                 .then((res) => { return res.json() })
    //                 .then((resData) => {
    //                     this.setState({
    //                         res: resData.data,
    //                     })
    //                     this.props.navigation.setParams({imageUri: this.state.res.profile_picture});
    //                     return resData
    //                 })
    //                 .catch(() => {
    //                     console.log('error displaying profile')
    //                 })
    //         }
    //         else {
    //             this.props.navigation.navigate('SignIn')
    //         }
    //     })
    // }

    fetchData = () => {
        AsyncStorage.multiGet(['token', 'userId']).then(stores => {
            const token = stores[0][1];
            const userId = stores[1][1];
            let index = this.props.navigation.state.params.index;
            const url = REQUEST_URL + HOME_URL + index + HOME_POST
            if (token) {
                fetch(url, {
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(res => { return res.json() })
                    .then((resData) => {
                        if (resData.message) {
                            this.setState({ isLoading: false })
                            alert(resData.message)
                        }
                        else {
                            this.setState({
                                isLoading: false,
                                dataSource: resData.data,
                            })
                        }
                        return resData;
                    }).catch((err) => {
                        this.setState({ isLoading: false })
                        console.log(err)
                    }).done

            }
            else { this.props.navigation.navigate('SignIn')}

        })
    }

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
        // this.props.navigation.navigate('ListPost', {index: item.id, profilePic: this.state.res.profile_picture})
    }
    onRefresh = () => {
        this.setState({isLoading: true});
        this.fetchData()
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
            this.state.isLoading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#fff' }}>
                    <ActivityIndicator animating={true} size="small" color="#000" />
                </View>
                :
                <View style={styles.container}>
                    {/* <FlatList
                        data={this.formatData(this.state.dataSource, numColumns)}
                        renderItem={this.renderItem}
                        numColumns={3}
                        keyExtractor={(item, index) => item.id}
                        refreshControl = {
                            <RefreshControl
                                refreshing={this.state.isLoading}
                                onRefresh={this.onRefresh}
                            />
                        }
                    /> */}
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
        // detailPage: (user) => dispatch(fetchPostDetails(user))
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(GridPage);


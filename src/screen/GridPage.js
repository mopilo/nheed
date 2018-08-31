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
import {isConnected} from '../../store/Actions/isConnected'
const { width } = Dimensions.get('window')
const numColumns = 3;

class GridPage extends Component {

    static navigationOptions = ({ navigation, transitioning }) => {
        const params = navigation.state.params || {};
        return{
            
            headerRight: (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name= 'search' size={23} color='#000000' style={{margin: 10}} onPress={()=>{navigation.navigate('Search')}}/>
                    {/* <Icon name= 'more-vertical' size={23} style={{margin: 10}} onPress={()=>{navigation.navigate('PlayTab')}}/> */}
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

    componentDidMount = () => {
        this.props.navigation.setParams({ 'pic': this.props.pic });
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
            return <Image  onError={({ nativeEvent: {error} }) => console.log(error)} source={{ uri: item.url }} style={{ height: width/3.1, width: width/3.1,  }} resizeMode="cover"/>;
        }
        return null;
    }

    listPost = (item) => {
        // this.props.navigation.navigate('ListPost', {index: item.id, profilePic: this.state.res.profile_picture})
    }
    // onRefresh = () => {
    //     this.setState({isLoading: true});
    //     this.fetchData()
    // }

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
                <View style={styles.container}>
                    <FlatList
                        data={this.formatData(this.props.data, numColumns)}
                        renderItem={this.renderItem}
                        numColumns={3}
                        keyExtractor={(item, index) => item.id}
                        // refreshControl = {
                        //     <RefreshControl
                        //         refreshing={this.state.isLoading}
                        //         onRefresh={this.onRefresh}
                        //     />
                        // }
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
    return {
        isLoading: state.ui.isLoading,
        isConnected: state.isConnected.isConnected,
        data: state.homeReducer.user,
        pic: state.homeReducer.pic
    };
};
  
  const mapDispatchToProps = dispatch => {
    return {
        network: (status) => dispatch(isConnected(status)),

        // detailPage: (user) => dispatch(fetchPostDetails(user))
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(GridPage);


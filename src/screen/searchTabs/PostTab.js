import React, {Component} from 'react';
import {Content, Text} from 'native-base'
import {FlatList, StyleSheet, View} from 'react-native'


export default class PostTab extends Component{

    renderItem = ({item}) => {
        
        return(
            <View style={{flex: 1,padding: 5}}>
                <Text>{item.account.username}</Text>
            </View>
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.props.post}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index)=> item.id.toString()}
                >
                </FlatList>
            </View>
        );
    }
} 

//styling
const  styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff'
}
});

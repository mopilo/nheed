import React, { Component } from 'react';
import { Content, Text } from 'native-base';
import { FlatList, StyleSheet, View, AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements';


export default class People extends Component {


    static navigationOptions =({navigation}) => {
            header: null
    };

    async userProfile(item) {
        // setting id for each user
        try {
            await AsyncStorage.setItem('acctId', item.toString());
        } catch (error) {
            console.log(error)
        }
        this.props.navigate("ViewProfile")
    }

    renderItem = ({ item }) => {

        return (
            item.type === false ?
            <View style={{ flex: 1, margin: 5 }}>
                <ListItem
                    onPress={this.userProfile.bind(this, item.id)}
                    roundAvatar
                    subtitle={item.username}
                    subtitleStyle={{color: '#000'}}
                    title={item.name}
                    titleStyle={{color: '#000'}}
                    avatar={{ uri: item.profile_picture }}
                    chevronColor='#000'
                />
            </View>
            :

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Use Image</Text>
        </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.user}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item.id.toString()}
                >
                </FlatList>

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

import React, { Component, PureComponent } from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    UIManager,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    FlatList
} from "react-native";
import colors from '../../styles/colors';
import HeaderBack from "../../components/HeaderBack";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class BabyAlbum extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
           
        };
    }

    renderItem = ({item}) => {
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('BabyGallery')} style={styles.rowAlbum}>
          <Image style={styles.thumbAlbum} source={{uri: item.thumb}} />
          <Text style={styles.titleAlbum}>
            {item.title}
          </Text>
          <Text>
            {item.desc}
          </Text>
        </TouchableOpacity>
      )
    }

    render() {
      const listAlbum = [{
        title: '12/02/2018',
        thumb: 'https://i.pinimg.com/736x/c8/1e/96/c81e969bddc3fd049d03929c6b31ffcd--screen-wallpaper-iphone--wallpaper.jpg',
        desc: '24 ảnh'
      },
      {
        title: 'Thể dục',
        thumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3f6e5055d9ad1d603fd364c11823d026&w=1000&q=80',
        desc: '24 ảnh'
      },
      {
        title: 'Thể dục',
        thumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3f6e5055d9ad1d603fd364c11823d026&w=1000&q=80',
        desc: '24 ảnh'
      },
      {
        title: 'Thể dục',
        thumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3f6e5055d9ad1d603fd364c11823d026&w=1000&q=80',
        desc: '24 ảnh'
      },
      {
        title: '12/02/2018',
        thumb: 'https://i.pinimg.com/736x/c8/1e/96/c81e969bddc3fd049d03929c6b31ffcd--screen-wallpaper-iphone--wallpaper.jpg',
        desc: '24 ảnh'
      },
      {
        title: '12/02/2018',
        thumb: 'https://i.pinimg.com/736x/c8/1e/96/c81e969bddc3fd049d03929c6b31ffcd--screen-wallpaper-iphone--wallpaper.jpg',
        desc: '24 ảnh'
      },
    ];
        return (
            <View style={{ flex: 1 }} >
              <HeaderBack
                  backgroundColor={'#fd4176'}
                  title={"Album ảnh"}
                  onPressLeft={()=>this.props.navigation.goBack()} />
              <View style={{flex: 1}}>
                <FlatList
                  data={listAlbum}
                  extraData={this.state}
                  keyExtractor={(item, index) => 'item' + index}
                  renderItem={this.renderItem}
                  numColumns={3}
                />
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  rowAlbum: {
    width:( width - 60)/3, 
    marginLeft: 15,
    marginTop: 15,
    alignItems: 'center',
  },
  thumbAlbum: {
    width: (width - 60)/3, 
    height: (width - 60)/3,
  },
  titleAlbum: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  }
});


export default BabyAlbum;


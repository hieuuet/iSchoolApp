import React, { PureComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';

class PageHeader extends PureComponent {
    render() {
        const { title, bg } = this.props;
        
        return (
            <View style={[{backgroundColor: bg?bg:colors.green}, styles.header]}>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 130, 
        position: 'relative'
    },
    title: {
        fontSize: 34,
        color: '#ffffff',
        position: 'absolute',
        left: 14,
        bottom: 9
    },
});

export default PageHeader;
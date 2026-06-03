import React from "react";
import {View, Text, StyleSheet} from "react-native";
import { theme } from "@/theme";

type StatBoxProps = {
    label: string;
    value: string | number;
};

export default function StatBox({label,value
}: StatBoxProps) {
    return(
        <View style={styles.container}>
         <Text style={styles.value}>{value}</Text>
         <Text style={styles.label}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,

        borderWidth: 1,
        borderColor: theme.colors.border,

        alignItems: "center",
    },

    value:{
        fontSize: 20,
        fontWeight: "700",
        color: theme.colors.textPrimary,
    },

    label: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginTop: 4,  
    },
});
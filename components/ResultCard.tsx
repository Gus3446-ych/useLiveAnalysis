import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { AnalysisResult } from '../types';

interface ResultCardProps {
    result: AnalysisResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
    return (
        <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>📊 분석 결과</Text>

            {result.raw && !result.description && (
                <View style={styles.rawResultCard}>
                    <Text style={styles.rawResultText}>{result.raw}</Text>
                </View>
            )}

            {result.description && (
                <View style={[styles.resultCard, styles.blueCard]}>
                    <Text style={styles.resultCardTitle}>🖼️ 이미지 설명</Text>
                    <Text style={styles.resultText}>{result.description}</Text>
                </View>
            )}

            {result.objects && result.objects.length > 0 && (
                <View style={[styles.resultCard, styles.purpleCard]}>
                    <Text style={styles.resultCardTitle}>📦 감지된 객체</Text>
                    <View style={styles.tagContainer}>
                        {result.objects.map((obj, idx) => (
                            <View key={idx} style={styles.tag}>
                                <Text style={styles.tagText}>{obj}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {result.brand && (
                <View style={[styles.resultCard, styles.greenCard]}>
                    <Text style={styles.resultCardTitle}>📝 제품명</Text>
                    <Text style={styles.resultText}>{result.brand}</Text>
                </View>
            )}

            {result.store && result.store.length > 0 && (
                <View style={[styles.resultCard, styles.yellowCard]}>
                    <Text style={styles.resultCardTitle}>🎨 판매하는 곳</Text>
                    <View style={styles.tagContainer}>
                        {result.store.map((store, idx) => (
                            <View key={idx} style={styles.tag}>
                                <Text style={styles.tagText}>{store}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {result.price && (
                <View style={[styles.resultCard, styles.indigoCard]}>
                    <Text style={styles.resultCardTitle}>🌍 가격 및 할인 정보</Text>
                    <Text style={styles.resultText}>{result.price}</Text>
                </View>
            )}


            <View style={styles.jsonCard}>
                <Text style={styles.jsonTitle}>📋 JSON 형식</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Text style={styles.jsonText}>{JSON.stringify(result, null, 2)}</Text>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    resultContainer: {
        padding: 16,
        paddingBottom: 40,
    },
    resultTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 16,
    },
    rawResultCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    rawResultText: {
        fontSize: 14,
        color: '#334155',
        lineHeight: 22,
    },
    resultCard: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    blueCard: {
        backgroundColor: '#dbeafe',
    },
    purpleCard: {
        backgroundColor: '#e9d5ff',
    },
    greenCard: {
        backgroundColor: '#d1fae5',
    },
    yellowCard: {
        backgroundColor: '#fef3c7',
    },
    indigoCard: {
        backgroundColor: '#e0e7ff',
    },
    grayCard: {
        backgroundColor: '#f1f5f9',
    },
    resultCardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 8,
    },
    resultText: {
        fontSize: 14,
        color: '#334155',
        lineHeight: 20,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    tagText: {
        fontSize: 12,
        color: '#1e293b',
        fontWeight: '500',
    },
    listItem: {
        fontSize: 14,
        color: '#334155',
        marginBottom: 4,
        lineHeight: 20,
    },
    jsonCard: {
        backgroundColor: '#1e293b',
        padding: 16,
        borderRadius: 12,
        marginTop: 4,
    },
    jsonTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 8,
    },
    jsonText: {
        fontSize: 12,
        color: '#10b981',
        fontFamily: 'monospace',
    },
});

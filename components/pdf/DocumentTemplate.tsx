import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { DocumentData } from "@/types/pdf";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
  },
  author: {
    fontSize: 11,
    color: "#333333",
    marginBottom: 4,
  },
  content: {
    marginBottom: 30,
    fontSize: 11,
    lineHeight: 1.5,
    color: "#000000",
    whiteSpace: "pre-wrap",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    fontSize: 9,
    color: "#666666",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingTop: 10,
  },
  footerText: {
    fontSize: 9,
    color: "#666666",
  },
});

export default function DocumentTemplate(data: DocumentData) {
  const currentDate = data.date || new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.author}>Author: {data.authorName}</Text>
          <Text style={styles.author}>Date: {currentDate}</Text>
        </View>

        {/* Content */}
        <Text style={styles.content}>{data.content}</Text>

        {/* Footer with page number and date */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{currentDate}</Text>
          <Text style={styles.footerText} render={({ pageNumber }) => `Page ${pageNumber}`} />
        </View>
      </Page>
    </Document>
  );
}

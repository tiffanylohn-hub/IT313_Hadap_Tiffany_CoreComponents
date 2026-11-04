
import { useState } from "react";

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";


interface Student {
  id: string;
  name: string;
  year: string;
  photoUrl: string;
  flagged: boolean;
}


interface StudentCardProps {
  id: string;
  name: string;
  year: string;
  photoUrl: string;
  flagged: boolean;
  onToggleFlag: (id: string) => void;
}


const initialStudents = [
  {
    id: "s1",
    name: "Ana Cruz",
    year: "3rd Year",
    photoUrl: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "s2",
    name: "Bea Santos",
    year: "2nd Year",
    photoUrl: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: "s3",
    name: "Cid Ramos",
    year: "4th Year",
    photoUrl: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: "s4",
    name: "Dex Alonzo",
    year: "1st Year",
    photoUrl: "https://i.pravatar.cc/100?img=4",
  },
  {
    id: "s5",
    name: "Eli Tan",
    year: "3rd Year",
    photoUrl: "https://i.pravatar.cc/100?img=5",
  },
];


function StudentCard({
  id,
  name,
  year,
  photoUrl,
  flagged,
  onToggleFlag,
}: StudentCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: photoUrl }}
        style={styles.studentImage}
      />

      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>
          {name}
        </Text>

        <Text style={styles.studentYear}>
          {year}
        </Text>
      </View>

      <Pressable
        onPress={() => onToggleFlag(id)}
        style={({ pressed }) => [
          styles.flagButton,
          flagged && styles.flaggedButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Text style={styles.flagText}>
          {flagged ? "Flagged" : "Flag for Advising"}
        </Text>
      </Pressable>
    </View>
  );
}


export default function StudentDirectory() {

  // STUDENT STATE
  const [students, setStudents] = useState<Student[]>(
    initialStudents.map((student) => ({
      ...student,
      flagged: false,
    }))
  );

 
  const [query, setQuery] = useState("");

  
  function toggleFlag(id: string) {
    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === id
          ? { ...student, flagged: !student.flagged }
          : student
      )
    );
  }


  const filteredStudents = students.filter((student) =>
    student.name
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <Text style={styles.heading}>
        Student Directory
      </Text>

      <Text style={styles.subtitle}>
        Find students who need academic advising.
      </Text>

      {/* SEARCH INPUT */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search student name..."
        placeholderTextColor="#94A3B8"
        value={query}
        onChangeText={setQuery}
      />

      {/* STUDENT LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            id={student.id}
            name={student.name}
            year={student.year}
            photoUrl={student.photoUrl}
            flagged={student.flagged}
            onToggleFlag={toggleFlag}
          />
        ))}

        {/* EMPTY SEARCH RESULT */}
        {filteredStudents.length === 0 && (
          <Text style={styles.emptyText}>
            No students found.
          </Text>
        )}
      </ScrollView>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F2F5FA",
    padding: 20,
    paddingTop: 60,
  },

  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#1E3A5F",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 5,
    marginBottom: 20,
  },

  searchInput: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCE3ED",
    marginBottom: 15,
    fontSize: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    elevation: 2,
  },

  studentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  studentInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },

  studentYear: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },

  flagButton: {
    backgroundColor: "#2563EB",
    padding: 9,
    borderRadius: 8,
  },

  flaggedButton: {
    backgroundColor: "#16A34A",
  },

  pressedButton: {
    opacity: 0.6,
    transform: [{ scale: 0.96 }],
  },

  flagText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 30,
    fontSize: 16,
  },

});

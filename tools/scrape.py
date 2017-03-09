# This tool is for generating a class list for the Tritor database.
# Usage: python scrape.py data_file out_file
#
#        data_file is the subject list data
#
#        out_file is an optional file that the output should go to
#        by default it is out.sql

from lxml import html

import sys
import urllib
import re
import MySQLdb
import json

# XPath queries for getting the courses' name and description.
QUERY_COURSE = '//p[@class="course-name"]/text()'
QUERY_DESC = '//p[@class="course-descriptions"]/text()'

# Replace all extra spaces with a single space and strip the outter whitespace.
def fix_spaces(text):
    text = re.sub('\s+', ' ', text)

    return text.strip()

output = open(sys.argv[2] if len(sys.argv) > 2 else "out.sql", "w")

# Outputs queries for inserting each course in a department to the database.
def parse(department):
    print("Parsing " + department + "...")

    # Get the catalog data from UCSD.
    url = "http://www.ucsd.edu/catalog/courses/" + department + ".html"
    f = urllib.urlopen(url)
    tree = html.fromstring(f.read())

    courses = tree.xpath(QUERY_COURSE)
    descriptions = tree.xpath(QUERY_DESC)

    # Create a MySQL query for each course in this department.
    for index, name in enumerate(courses):
        # Get the raw text from the queries.
        values = fix_spaces(name).partition('.')

        # Remove unwanted spaces.
        code = re.sub('\s', '', values[0].strip())
        title = re.sub('\s\(.*', '', values[2][:-4])
        desc = fix_spaces(descriptions[index])

        # Convert to ASCII for queries.
        code = code.encode("ascii", errors="ignore")
        title = title.encode("ascii", errors="ignore")
        desc = desc.encode("ascii", errors="ignore")

        # Escape values for making a query.
        code = MySQLdb.escape_string(code)
        title = MySQLdb.escape_string(title)
        desc = MySQLdb.escape_string(desc)

        # Output the query for this course.
        output.write("INSERT INTO tritor_courses (classID,className,description) VALUES ('{0}','{1}','{2}');".format(code, title, desc))
        output.write("\n")

def main():
    # Load the departments from a department JSON file.
    # See: https://act.ucsd.edu/scheduleOfClasses/subject-list.json?selected
    #      Term=WI17
    data_file = open(sys.argv[1])
    subjects = json.load(data_file)

    for subject in subjects:
        parse(subject["code"].strip())

    output.close()

if __name__ == "__main__":
    main()

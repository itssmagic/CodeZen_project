#include <iostream>

using namespace std;

int main() {
    int num1, num2, maxNum;


    cin >> num1 >> num2;

    // Using conditional operator
    maxNum = (num1 > num2) ? num1 : num2;

    cout  << maxNum << endl;

    return 0;
}

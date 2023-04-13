#include "testlib.h"
#include <bits/stdc++.h>
using namespace std;

int main(int argc, char** argv) {
    ios_base::sync_with_stdio(0);cin.tie(0);
    registerGen(argc, argv, 1);

    bool fixedN = opt<bool>("fixedN");
    int edgePro = opt<int>("edgePro");
    int off1Pro = opt<int>("off1Pro");
    int delPro = opt<int>("delPro");
    bool st1 = opt<bool>("st1");
    bool st2 = opt<bool>("st2");
    bool st3 = opt<bool>("st3");
    bool st4 = opt<bool>("st4");

    int N = 1000;
    if(!fixedN) {
        N = rnd.next(2, 1000);
    }
    if(st4) {
        N = max(3, N / 3 * 3);
    }

    int hole[1005];
    for(int i = 1; i <= N; i++) {
        int pro = rnd.next(100);
        if(i < 3 || pro < edgePro) {
            hole[i] = rnd.next(2) ? 1 : i;
        }
        else if(pro - edgePro < off1Pro) {
            hole[i] = rnd.next(2) ? 2 : i - 1;
        }
        else {
            hole[i] = rnd.next(2, i - 1);
        }
    }

    vector<pair<int, int>> real_hole;
    if(st1) {}
    else if(st2) {
        if(N >= 4) {
            int row = rnd.next(3, N - 1);
            real_hole.emplace_back(row, hole[row]);
        }
    }
    else if(st3) {
        int row = rnd.next(1, N);
        real_hole.emplace_back(row, hole[row]);
    }
    else if(st4) {
        for(int i = 2; i <= N; i += 3) {
            real_hole.emplace_back(i, hole[i]);
        }
    }
    else {
        for(int i = 1; i <= N; i++) {
            if(real_hole.size() && i - real_hole.rbegin()->first < 3) continue;
            int pro = rnd.next(100);
            if(pro < delPro) continue;
            real_hole.emplace_back(i, hole[i]);
        }
    }
    cout << N << ' ' << real_hole.size() << '\n';
    for(auto [x, y]: real_hole) {
        cout << x << ' ' << y << '\n';
    }

    return 0;
}
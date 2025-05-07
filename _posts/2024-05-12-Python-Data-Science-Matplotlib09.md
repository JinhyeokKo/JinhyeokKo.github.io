---
title: Settings_And_Stylesheets
date: 2024-05-12
categories: [ Python Data Science ]
tags: [ Matplotlib ]
layout: post
---

# Customizing Matplotlib: Configurations and Stylesheets

## Plot Customization by Hand

```python
import matplotlib.pyplot as plt

plt.style.use('classic')
import numpy as np

%matplotlib
inline

x = np.random.randn(1000)
plt.hist(x);
```

![png](assets/img/Settings_And_Stylesheets_files/Settings_And_Stylesheets_2_0.png)

```python
# use a gray background
ax = plt.axes()
ax.set_facecolor('#E6E6E6')
ax.set_axisbelow(True)

# draw solid white grid lines
plt.grid(color='w', linestyle='solid')

# hide axis spines
for spine in ax.spines.values():
    spine.set_visible(False)

# hide top and right ticks
ax.xaxis.tick_bottom()
ax.yaxis.tick_left()

# lighten ticks and labels
ax.tick_params(colors='gray', direction='out')
for tick in ax.get_xticklabels():
    tick.set_color('gray')
for tick in ax.get_yticklabels():
    tick.set_color('gray')

# control face and edge color of histogram
ax.hist(x, edgecolor='#E6E6E6', color='#EE6666');
```

![png](assets/img/Settings_And_Stylesheets_files/Settings_And_Stylesheets_3_0.png)

## Changing the Defaults: rcParams

```python
IPython_default = plt.rcParams.copy()
```

```python
from matplotlib import cycler

colors = cycler('color',
                ['#EE6666', '#3388BB', '#9988DD',
                 '#EECC55', '#88BB44', '#FFBBBB'])
plt.rc('axes', facecolor='#E6E6E6', edgecolor='none',
       axisbelow=True, grid=True, prop_cycle=colors)
plt.rc('grid', color='w', linestyle='solid')
plt.rc('xtick', direction='out', color='gray')
plt.rc('ytick', direction='out', color='gray')
plt.rc('patch', edgecolor='#E6E6E6')
plt.rc('lines', linewidth=2)
```

```python
plt.hist(x);
```

![png](assets/img/Settings_And_Stylesheets_files/Settings_And_Stylesheets_7_0.png)

```python
# rc 매개변수를 활용했을 때 간단한 라인 플롯
for i in range(4):
    plt.plot(np.random.rand(10))
```

![png](assets/img/Settings_And_Stylesheets_files/Settings_And_Stylesheets_8_0.png)

## Stylesheets

```python
plt.style.available[:5]
```

    ['Solarize_Light2',
     '_classic_test_patch',
     '_mpl-gallery',
     '_mpl-gallery-nogrid',
     'bmh']

```python
def hist_and_lines():
    np.random.seed(0)
    fig, ax = plt.subplots(1, 2, figsize=(11, 4))
    ax[0].hist(np.random.randn(1000))
    for i in range(3):
        ax[1].plot(np.random.rand(10))
    ax[1].legend(['a', 'b', 'c'], loc='lower left')
```

### Default style

```python
# reset rcParams
plt.rcParams.update(IPython_default);
```

```python
hist_and_lines()
```

![png](assets/img/Settings_And_Stylesheets_files/Settings_And_Stylesheets_14_0.png)

### FiveThiryEight style

```python
with plt.style.context('fivethirtyeight'):
    hist_and_lines()
```

![png](assets/img/Settings_And_Stylesheets_files/Settings_And_Stylesheets_16_0.png)

### ggplot

```python
with plt.style.context('ggplot'):
    hist_and_lines()
```

![png](assets/img/Settings_And_Stylesheets_files/Settings_And_Stylesheets_18_0.png)

### Bayesian Methods for Hackers style

```python
with plt.style.context('bmh'):
    hist_and_lines()
```

![png](assets/img/Settings_And_Stylesheets_files/Settings_And_Stylesheets_20_0.png)

### Dark background

```python
with plt.style.context('dark_background'):
    hist_and_lines()
```

![png](assets/img/Settings_And_Stylesheets_files/Settings_And_Stylesheets_22_0.png)

### Grayscale

```python
with plt.style.context('grayscale'):
    hist_and_lines()
```

![png](assets/img/Settings_And_Stylesheets_files/Settings_And_Stylesheets_24_0.png)

### Seaborn style

```python
import seaborn

hist_and_lines()
```

![png](assets/img/Settings_And_Stylesheets_files/Settings_And_Stylesheets_26_0.png)
    


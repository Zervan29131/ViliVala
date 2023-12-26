# 我为什么不喜欢 Go 语言

> 首先我必须指出，这篇文章**带有强烈的主观色彩**。任何语言都有它的使用价值，语言圣战不仅没有意义，还很幼稚。

&emsp;&emsp;Go 作为一门新兴语言，在短短几年的时间内就取得了如此高的关注度，并带来了非常丰富的生态。这对于刚学完 Rust 的我自然而然地充满了吸引力，因为 Rust 让我 充分感受到了现代化工业语言设计与理论相结合的最佳实践，而 Go 以快速、可靠和高效率著称，尤其是在高并发领域。与此同时，很多人喜欢把 Go 和 Rust 相比较，它们都注重高性能，也都声称解决了一系列其他语言难以解决的问题，两者的年龄也差不多。我便对Go充满了好奇和期待：到底是怎样优秀的设计能让 Go 如此受人追捧？

&emsp;&emsp;原来是“大道至简”啊！

下面我就来讲讲 Go 的设计哲学。

---

## 违反直觉的类型标注

&emsp;&emsp;Go 的类型标注居于标识符之后，且没有使用冒号加以分隔，并且在连续的多个参数类型相同时可以省略前面的类型标识。\
&emsp;&emsp;这使得同时出现多个函数参数时的可读性被削弱，你不能一眼看出哪些参数具有哪些类型:

```go
func f(a, b chan int, c, d int) {

}
```

&emsp;&emsp;你不能在第一时间得知 a 的类型，而是要向后看一段代码，直到发现 `b chan int` 才能知道原来a和b是同样的类型 `chan int`。\
&emsp;&emsp;当语法高亮不可用时，这种代码会更加难以阅读。

## 令人迷惑的 return

Go 支持多返回值，但在使用具名返回时，你仍需要在末尾进行 return：

```go
func f() (x int, y int) {
    x = 1
    y = 2
    return
}
```

```go
func f() (x int, y int) {
    x = 1
    y = 1
    return x, y
}
```

上面的两种写法是等价的，但显然应该使用后一种写法。

## 不支持嵌套多行注释

和某些语言一样，Go 同样不支持嵌套的多行注释：

```go
/*/**/*/
```

&emsp;&emsp;虽然在我常用的语言在对嵌套多行注释的支持性上并没有表现出一致的共识，但我仍希望 Go 能够具备这个特性，因为这对于某些调试场景来说是很友好的。

## 随处可见的基本类型偏执

&emsp;&emsp;Go 的标准库中充满了基本类型偏执。\
&emsp;&emsp;所谓基本类型偏执，是指在基本类型上约定一个特殊的值来表示不同的意义，这样的方式不是类型安全的，通常会带来难以察觉的潜在问题。

常见地，设置最大 Goroutine 数量的方式就是基本类型偏执：

```go
runtime.GOMAXPROCS(0)
```

&emsp;&emsp;当参数>=1时，视为设置最大 Goroutine 数量。否则，则返回当前设置的最大 Goroutine 数量。

&emsp;&emsp;设置和读取最大 Goroutine 数量应该交由不同的函数负责（即使使用一个函数负责，也应该采用类似于 ADT 的方式），这是基本的抽象行为。

## 意义不明的 `:=`

Go 提供具备类型推导的变量声明，有两种方式可以做到这一点：

```go
var a = 1
```

```go
func f() {
    a := 1
    println(b)
}
```

&emsp;&emsp;但令人不解的是，`:=` 仅能在函数内部使用，而 var 则没有这个使用限制。\
&emsp;&emsp;甚至，`var` 要更加通用一些，它允许仅进行声明而不赋初值（此时的初值是类型默认值）：

```go
var a int//a is 0
```

`var` 完全能够胜任 `:=` 的工作，也不会破坏抽象。\
而更糟糕的是，`:=` 还有一个使用陷阱，参见下文。

## receiver 弃元

&emsp;&emsp;Go 使用类似于扩展方法的语法为结构提供方法抽象，结构的值或其引用被作为函数的第一个参数（被称为 receiver）被放在函数名的左边（语法糖，以显得更加清晰）。\
&emsp;&emsp;但在某些抽象层次，我们需要在类型上实现不需要使用 receiver 的函数，以下的两种写法是等价的：

```go
type A struct{ field int }

func (A) F1()   {}
func (_ A) F2() {}
```

&emsp;&emsp;`_` 被称作**弃元**，它是用于占位而不会被（也不能被）使用的标识符，相当于一个黑洞。

但 Go 中不存在**静态方法**的抽象，于是你只能这样调用：

```go
(*A).F1(nil)
```

这被称作**方法表达式**。\
&emsp;&emsp;尽管这个例子显得有些牵强，但置 receiver 为 nil 显然是不优雅的。\
并且，既然可以没有 receiver（如同F1），那为什么要为了语法统一而必须传入 receiver 呢？

## 执着于复用关键字

&emsp;&emsp;Go 总是倾向于复用已有的关键字。通过扩充语义或添加特例语法，你经常能够在 Go 中看到同一个关键字的不同作用：

### type alias 与 new type

```go
//type alias
type A = int
type B = int

//new type
type C int
type D int
```

&emsp;&emsp;类型别名（type alias）和新类型（new type）使用同样的 `type` 关键字，区别仅在于前者有等号。\
&emsp;&emsp;而 Go 中的 new type 会继承底层类型的操作（仅对于基本类型），这一行为又会让人以为自己是在使用 type alias。

### 循环

Go 的 for 有四种用法：

```go
for x := 3; x > 0; x-- {
    //一般用法
}
for i > 0 {
    //while
}
for {
    //while(true)
}
for index, value := range [...]int{1, 2, 3} {
    //foreach
}
```

&emsp;&emsp;for 承担了过多责任，你仍需要查看之后的代码才能分辨 for 具体是哪一种用法。\
我更倾向于使用 `for`, `while`, `loop` 和 `foreach`，意义分明。

&emsp;&emsp;对于复用关键字的讨论，官方的立场是复用关键字能保持Go编译器的的高效性（Go 的确编译的很快，这点没得黑）和语法的简洁性，但我觉得语言的设计还是要符合人的思维方式（追求高效编译和语法简洁你去写汇编啊。

### 条件分支

Go 的 if 语句可以添加初始化前缀：

```go
if i := 100; i > 0 {
    //TODO
}
```

switch 也一样：

```go
switch i := 100; i {
case 1:
    //TODO
case 2:
    //TODO
default:
    //TODO
}
```

于是你就能写出这样的代码：

```go
if i := 100; todo() {
    println(i)
}
```

&emsp;&emsp;为条件分支添加初始化前缀同样不能让人一眼看到条件的具体内容，理想的写法应该是这个样子的：

```go
if i > 0 where i := 100 {
    //可惜Go并没有这样做
}
```

另外，其 switch 还支持类型查询：

```go
switch v := i.(type) {
case nil:
    print("nil")
case A:
    print(v)
case B:
    print(v)
default:
    print(i)
}
```

&emsp;&emsp;这让本就难以记住的 switch 又多了一种使用方法（并且还有坑，稍后会提到）。同时，`v := i.(type)` 是类型断言 `v := i.(A)` 在 switch 中的语法特例，这种语法仅能在此处使用。

&emsp;&emsp;Go 的设计者可能希望通过这种方式体现 Go 的简洁，但以上用例显然不能让人感到直观（有时甚至违反直觉），只会让代码审阅更加头疼，让使用者感到困惑。

## 切片陷阱

&emsp;&emsp;Go 的切片不是值拷贝，而是对原数组的引用。这意味着对原数组的更改会反映到其衍生出的切片上：

```go
arr := [...]int{1, 2, 3, 4, 5}
slice := arr[0:2]
println(slice[0]) //1
arr[0] = 0
println(slice[0]) //0
slice[0] = -1
println(arr[0]) //-1
```

共享极其容易导致 UAF 问题，也缺乏并发安全。

&emsp;&emsp;但 Go 既不像其他语言那样引入只读切片，也不做编译期检查。你只能通过代码规范来约定对切片的使用方法，或对其加锁来控制并发问题。

曾经在群聊中看到这样一句话：

> Go 那个 slice 扩容其实是个 take ownership 的操作，扩容后之前的就不应该用，但是垃圾 Go 又没 ownership，所以不懂 Rust 的人是写不好 Go 的

## 值传递的弊端

&emsp;&emsp;Go 中只有值类型，其他语言中的默认行为在 Go 中需要通过引用来实现。这就要求 Go 的任何类型都有一个默认值，也被称作**零值**：

```go
var i int     //0
var s string  //''
var c rune    //0
var d float64 //0.0
```

&emsp;&emsp;这就让一些零值具有特殊意义的使用场景变得十分尴尬：你并不知道传没传值。因为没传是零值，传了零值也是零值。

&emsp;&emsp;由于 Go 在任何时候都进行值传递，在频繁的数据转移时会带来比引用更大的性能开销。\
&emsp;&emsp;使用引用可以避免这种开销，于是你的代码就可能变成这个样子（我明白这个例子有些夸张）:

```go
var a *****A
```

Go的传值行为其实并没有带来多少便利。

## 可忽略的 CommaOk

&emsp;&emsp;CommaOk 是 Go 中常见的代码规范：如果一个函数可能返回不应使用的值（通常是错误），那么应通过返回的第二个布尔值（也可以是 error 类型）来判断这个值是否合法：

```go
file, err := os.Open("file")
if err != nil {
    //handle file
}
```

但对于一些内置类型（例如 map 和 chan），你可以忽略"Ok"：

```go
m := map[string]int{}
v := m["hi"]
println(v) //0
```

&emsp;&emsp;在这种情况下，你压根就不知道 map 里有没有这个键值对：当键不存在时，会返回类型的零值！

没有任何理由去使用无意义的值。Go 会默许这种行为，这非常危险。

## 不能拓展的方法设计

Go 通过为结构增加方法来提供类型的方法抽象：

```go
type A struct{ field int }

func (r A) F() {
    println(r.field)
}
```

方法 `F` 有一个接收者（receiver）r，它相当于 OO 中的 `this`，于是你就能这样调用：

```go
a := A{field: 1}
a.F()//1
```

&emsp;&emsp;虽然 Go 的方法设计很类似于其他语言中的**拓展方法**，但Go的方法并不支持拓展，因为你只能为相同包中的结构增加方法。

如此的语法设计并没有带来更多便利，虽然它长得像。

## 过多的编译器开洞

Go 中有很多特殊函数，它们是编译器开的特例，并且有特别的语法：

```go
//type A struct{ field int }

a := new(A)
m := make(map[string]int)
c := make(chan string, 10)
```

&emsp;&emsp;你只能对于特定用途使用这些函数。它们也不是 Rust 中的 `trait`，你也不能让自己的类型满足它们的约束要求。

这些特例破坏了语言的统一性。

## 无意义的类型查询结果

```go
type A struct{ a int }
type B struct{ b int }
type C struct{ c int }

//...
switch v := a.(type) {
case A, B:
    println(reflect.TypeOf(v)) //(0x482ea0,0x464280)
    println(reflect.TypeOf(a)) //(0x482ea0,0x464280)
default:
    println("default")
}
```

当一个 case 匹配多个类型时，`v` 的类型和 `a` 的类型相同（实际会发生 `v:=a`）。

这种行为同样会发生在没有任何类型满足匹配时：

```go
switch v := a.(type) {
case C:
    println("is C")
default:
    println(reflect.TypeOf(v)) //(0x482ea0,0x464280)
    println(reflect.TypeOf(a)) //(0x482ea0,0x464280)
}
```

Go 编译器没有禁止这种行为，你仍能够在此时使用 v，但显然 v 是没有意义的。

## interface安全性

Go 在没有泛型之前，空接口的使用十分普遍：

```go
func f(x interface{}) {

}
```

这其实就是 C 语言中的`void *`。

&emsp;&emsp;放弃类型检查带来的泛化不仅难以理解，还可能产生潜在的安全问题（更为重要地，它们通常难以复现和调试）。由于缺乏静态信息，编译器也难以对这类模式进行优化，如果搭配反射使用，则又会带来性能问题。\
&emsp;&emsp;同时，Go 编译器并不会进行静态检查，直接在未初始化的接口上调用方法是被允许的（产生运行时 panic）。

另外，空接口还有一个陷阱：

```go
var x *interface{} = nil
var y interface{} = x

println(y)        //(0x4585a0,0x0)
println(y == nil) //false
```

&emsp;&emsp;按常理来说，Go 会将 x 的值 `nil` 复制到 y 的值，从而使得 y 为 `nil` 才对。但 Go 在空接口的内部实现中有两个字段，它们分别是类型和指向值的指针，只有当两者均为 `nil` 时，空接口才为 `nil`。

这就导致了非常违反直觉的结果：

```go
var i interface{} = (*A)(nil)

println(i == nil)         //false
println((*A)(nil) == nil) //true
```

## 简陋的泛型设计

Go 在 1.18 终于提供了对泛型的支持：

```go
type Box[T any] struct {
    value T
}

func unwrap[T any](b Box[T]) T {
    return b.value
}

func main() {
    b := Box[int]{value: 1}
    print(unwrap(b)) //1
}
```

&emsp;&emsp;但 Go 的泛型实现其实相当简陋，你大多数时候都需要借助于反射来收集足够的类型信息，尽管有足够的信息去在编译期特化，下面有两个例子:

### 不支持在类型参数上进行 type assertion

```go
func mempty[T []int | string]() T {
    var z T
    switch z.(type) {
    case []int:
        return []int{}
    case string:
        return ""
    }
}
/*
...cannot use type switch on type parameter value z (variable of type T constrained by []int|string)
...cannot use []int{} (value of type []int) as type T in return statement:
...cannot assign []int to string (in T)
...cannot use "" (untyped string constant) as T value in return statement
*/
```

### 也没有办法实施对基础类型的泛化约束

```go
type BaseOn[T any] interface {
    ~T
}

func as[T BaseOn[B], B any](x T) B {
    return (B)(x)
}

func main() {
    type A int
    var a A = 1
    i := as[A, int](a)
    println(i)
}
/*
...cannot embed a type parameter
...cannot convert x (variable of type T constrained by BaseOn[B]) to type B
...cannot implement BaseOn[int] (empty type set)
*/
```

受限于历史包袱、匮乏的静态信息和性能，Go还不支持泛型方法。

## 不被处理的 Goroutine 返回值

由 Goroutine 调度的函数，其返回值会被忽略：

```go
go func() int {
    return 1//1不能通过任何方式被获取
}()
```

&emsp;&emsp;但 Go 使用返回值表示错误（CommaOk），此时忽略返回值就意味着可能存在被忽视潜在的错误，这是不安全的。

&emsp;&emsp;我认为理想的 Goroutine 应只允许调度不返回的函数（等效地，也可以返回某种单值类型 Unit），对于接受任何返回值的调度，应使用弃元：

```go
go func() {
    _ := f()
}()
```

这样，所有的情况都能得到显式处理。

## defer 陷阱

defer 是 Go 用于注册延迟调用的关键字：

```go
defer print(0)
defer print(1)
print(2)
print(3)
return //output is 2310
```

当函数返回前，被 defer 的函数会以 LIFO 顺序执行。

defer 也被用于异常恢复，但如下的 defer 是无效的：

```go
defer recover()
panic("crash!")
return
```

编译通过，但异常在运行时被传播了。你必须对 recover 进行函数包装：

```go
defer func() { recover() }()
panic("crash!")
return
```

&emsp;&emsp;我们又发现了一个特例。因为 `func(){}()` 和 `f()` 是等价的，它们都是有效的函数调用，注册到 defer 时行为一致。但 `defer recover()` 并没有产生预期行为，recover 是编译器开的一个洞。

同时，defer 还有一个坑：

```go
func f() (x int) {
    defer func() { x = 1 }()
    return 0
}

func main() {
    println(f())//1
}
```

&emsp;&emsp;在这个例子中，Go 首先会执行 return，将 0 拷贝到返回值栈区（Go 的多返回值是通过在栈空间上预留区域实现的），然后 defer 会被执行（以 LIFO），最后会退出当前调用栈并返回到上层调用栈（也就是汇编中的RET）。

&emsp;&emsp;这种奇怪的设计让 return 不再是 Go 函数中最后被执行的语句，return 的执行被割裂成了两个部分，而 defer 被穿插在二者之间执行。

&emsp;&emsp;具名返回的行为是令人困惑的，这显然与它的设计初衷相违。也有人提出应避免使用具名返回以防范 defer 问题，这与解决 `:=` 的副作用问题有些类似（见下文），都有点自废武功的感觉。

## `:=` 的模糊语义

Go 中的 `:=` 适用于在函数内声明变量的同时完成其初始化：

```go
a := 1     //a的类型由推导暗示，为int
println(a) //1
```

但在某些情况下，`:=` 也可以进行赋值：

```go
var a int
println(a, &a) //0 0xc000054768
a, b := 1, 2
println(a, &a) //1 0xc000054768
println(b)     //2
```

&emsp;&emsp;这是因为 Go 在编译时要求 `:=` 至少创建一个变量，在这个例子中那个变量是 `b`。\
要想避免这种副作用，推荐的做法是先声明再赋值，但这显得十分原始，更重要的是，你可能忘了在之后对声明赋值：

```go
var a, b int
a = 1
b = 2
//当然你也可以这样写，但它不像:=那样是强制的
//var a, b = 1, 2
```

当使用同一变量接收多个由 CommaOk 提供的错误信息时，这一副作用会更加明显：

```go
file1, err := os.Open("file1")
file2, err := os.Open("file2")
if err == nil {//always true if file2 exists
    //handle file1 and file2
}
```

错误信息会被难以察觉地覆盖，很可能 file1 在文件系统上是不存在的。

## 多重异常范式

Go 具有两套异常处理模型：panic/recover 和 CommaOk。

panic/recover 是 try/catch的变种：

```go
defer func() {
    msg := recover()
    fmt.Println(msg)
}()
panic("panic message")
```

&emsp;&emsp;不同于 Rust 的 panic，在 Go 中你可以使用 recover 来捕获当前调用调用栈中最后抛出的 panic，并阻止栈展开。

&emsp;&emsp;这就使得 Go 能够用异常来表示控制流，而这种控制流是相当混乱的。\
&emsp;&emsp;想要规范这种控制流，则必须采用**受检异常**，但实践已经表明这类方式并不优雅（可以参考 Java），因为总是有无法处理的异常，你总是需要 catch anything and do nothing（顶多记录一下日志）。所以现在大家都不用受检异常了，crash is awesome。

归根结底，还是不应该让异常接管控制流。

CommaOk 是 POSIX 风格错误处理（参见 CS:APP 附录 A）的变种：

```go
val, ok := tod88888888888888888o()
if ok {
    //use val
}
```

&emsp;&emsp;但对于某些场景（例如 map），"Ok"是可以被忽略的（参见上文讨论），这种方式也不够安全。

&emsp;&emsp;两种范式的混用最终导致了 Go 并没有解决异常处理的一系列问题，甚至还将问题复杂化了（因为 defer 的 LIFO 和 recover 的 weak）。

## goto

Go 有一个功能受限的 goto，它只能在函数内部跳转，且无法跳过变量声明：

```go
x := 2
if x > 1 {
    goto L1
} else {
    goto L2
}
L1:
println("L1")//L1
return
L2:
println("L2")
return
```

尽管 Go 中受限的 goto 安全性要好一些，但使用它编写的程序仍然是不安全和难以维护的。

&emsp;&emsp;也不能一味地贬低 goto，在某些场景中使用 goto 也是有优势的（据群友说在实现某些解码器时使用 goto 能带来很大的性能提升，讨论基于 C）。但我认为 Go 并不是将性能作为第一考量的语言（因为 Go 有 GC，而 GC 的抖动是不可避免的），综合来看，保留 goto 的做法仍弊大于利。

---

&emsp;&emsp;其实，Go 只是把传统问题换了一种语法表达罢了。Go 设计团队的谜之设计甚至为 Go 带来了很多问题（并且他们不听取社区意见，一意孤行），这让 Go 逐渐变得违反直觉、令人困惑（可怕的是有些人执着地认为这些设计是符合“Go哲学”的：Go 是简洁的，不是 Go 没有，而是你根本不需要它。

使用 Go，你的确能够快速给出产品原型，也的确能利用很多并发设施，这确实比使用 C 或 C++ 要快些。但 Go 没有解决安全问题，给我的感觉是 Google 创造了一门能够更快速写 Bug 的编程语言。

&emsp;&emsp;Go 宣称快速，但却使用了 GC（这个 GC 的性能也备受争议），这不可避免地带来了性能抖动问题，也浪费了硬件资源。这使得 Go 不能用于开发面向性能的应用或是开发资源受限的应用（尽管如此，但仍有很多超大型项目是使用 Go 的，这可能是由于历史和团队原因）。但如果是这样的话，我为什么不去用 Node, JVM 或是 .NET 呢？要知道它们同样快速。

&emsp;&emsp;Go 宣称可靠，但你依然能够使用 Go 写出具有明显错误（并非逻辑错误，而是一些能够在编译期发现的错误，例如空引用或内存泄漏）的程序并通过编译（最重要的是写出这样的程序何其容易！），你仍需要进行大量的测试和分析以发现诸如 NPE, UAF 和 Dead lock 之类的问题。Go 不但没有引入一个安全的类型系统（空接口是 weak 的），也不会进行编译时安全检查。Go 不能解决历史遗留问题，就像 C++ 一样。

&emsp;&emsp;Go 甚至没有一个好用的包管理系统（Google 只关心他们自己的开发体验，本来 Go 就是一个在 Google 内部使用的语言），也缺失了很多提升开发效率和抽象层次的语言设施（简陋的泛型设计、到处都是擦除的类型系统、不能使用宏进行代码生成），甚至带来了非常多的陷阱（更可怕的是，这些陷阱集成到了语言层面）。另外，Go 使用 Plan9 汇编，由于这种汇编资料匮乏，除了 Google 外也没人能够对 Go 进行优化改良（即便有，Google 的这种“垄断式”开源方式也让人难以参与语言的演化进程）。

&emsp;&emsp;在我看来，貌似 Go 更适合作为云原生 IL。比如让一些依赖于 GC 的语言翻译到 Go，再由 Go 编译器编译到机器码......或许某一天大家更喜欢把语言编译到 Go，而不是 JavaScript（笑。

&emsp;&emsp;在 Google 的力推下，Go 或许还能挺十几年（或者几十年，因为它入门简单），但这并不是一门面向未来而设计的语言。

## 后话

&emsp;&emsp;这篇文章其实计划是要在 6/7 月份发表的，奈何赶上 pilipala 内核的开发，才一拖拖到现在。当时的我刚看完《Go 语言核心编程》这本书，由于之前学过 Rust，又看过《Kotlin 核心编程》（Rust 和《Kotlin 核心编程》都非常不错！），于是在接触 Go后产生了极大的心理落差，所以想要喷一下 Go。\
&emsp;&emsp;其实辩证地去看，Go 也没有那么差，它确实有适合它使用的人，尤其是那些 C++ 钉子户，因为学习 Go 的门槛是非常低的，也不涉及到 PL 之类的东西（能吃饭的语言就是好语言！）。Go 的语言设计确实称不上优秀，但是对于重构用途还是有价值的，尤其是原有的基于脚本语言的项目，Go 的提升还是很大的（参考 ESBuild 对比 Webpack），而且在现在这个硬件资源十分过剩的时代，多个 GC 也没什么性能消耗，像 Go 这种天天 alloc 不回收的顶多加点内存条嘛（大雾）！要知道硬件成本可是最低的。

&emsp;&emsp;但我还是要骂《Go 语言核心编程》这本书和它的作者李文塔！一本 30 万字的书，光是被我发现的错误就有 37 处！可见这个人的编书质量是多么的糟糕。抛开勘误不谈，李文塔对于语言的认识也存在偏差，以下取自原书第 56 页：

> 对象是附有行为的数据，而闭包是附有数据的行为，类在定义时已经显式地集中定义了行为，但是闭包中的数据没有显式地集中声明的地方，这种数据和行为耦合的模型不是一种推荐的编程模型，闭包仅仅是锦上添花的东西，不是不可缺少的。

光是倡导不要使用闭包这种暴论，就足以说明一切了。

我还是头一回读这么傻逼的书。

---

本文基于 Go 1.18.3 编写
